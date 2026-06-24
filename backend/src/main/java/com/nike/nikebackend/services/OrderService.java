package com.nike.nikebackend.services;

import com.nike.nikebackend.model.Order;
import com.nike.nikebackend.model.OrderItem;
import com.nike.nikebackend.model.Product;
import com.nike.nikebackend.model.User;
import com.nike.nikebackend.repository.OrderItemRepository;
import com.nike.nikebackend.repository.OrderRepository;
import com.nike.nikebackend.repository.ProductRepository;
import com.nike.nikebackend.repository.UserRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    @Value("${razorpay.key.id}")
    private String keyId;
    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private OrderItemRepository orderItemRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ProductRepository productRepo;

    public String createRazorpayOrder(double amount) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(keyId, keySecret);
        JSONObject options = new JSONObject();
        options.put("amount", (int) (amount * 100)); // Razorpay needs amount in paise
        options.put("currency", "INR");
        options.put("receipt", "order_" + System.currentTimeMillis());
        com.razorpay.Order order = client.orders.create(options);
        return order.get("id");

    }

    public boolean verifyPayment(String razorpayOrderId, String razorpayPaymentId, String signature) {
        try {
            String data = razorpayOrderId + "|" + razorpayPaymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);
            byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString().equals(signature);
        } catch (Exception e) {
            return false;
        }
    }

    public Order saveOrder(String email, String address, double totalAmount,
            String razorpayOrderId, String razorpayPaymentId,
            List<Map<String, Object>> cartItems) {
        User user = userRepo.findByEmail(email).orElseThrow();
        // Save the Order header
        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setTotalAmount(totalAmount);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PAID");
        order.setPaymentMethod("Razorpay");
        order.setRazorpayOrderId(razorpayOrderId);
        order.setRazorpayPaymentId(razorpayPaymentId);
        Order savedOrder = orderRepo.save(order);
        // Save each OrderItem
        for (Map<String, Object> item : cartItems) {
            Long productId = Long.parseLong(item.get("productId").toString());
            int quantity = Integer.parseInt(item.get("quantity").toString());
            double price = Double.parseDouble(item.get("price").toString());
            Product product = productRepo.findById(productId).orElseThrow();
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setPriceAtPurchase(price);
            orderItemRepo.save(orderItem);
        }
        return savedOrder;
    }

    // Get order history for user
    public List<Order> getOrderHistory(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return orderRepo.findByUserOrderByOrderDateDesc(user);
    }

    // Save Cash on Delivery order
    public Order saveCodOrder(String email, String address, double totalAmount,
                               List<Map<String, Object>> cartItems) {
        User user = userRepo.findByEmail(email).orElseThrow();

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setTotalAmount(totalAmount);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");         // Not yet paid
        order.setPaymentMethod("Cash on Delivery");
        Order savedOrder = orderRepo.save(order);

        for (Map<String, Object> item : cartItems) {
            Long productId = Long.parseLong(item.get("productId").toString());
            int quantity = Integer.parseInt(item.get("quantity").toString());
            double price = Double.parseDouble(item.get("price").toString());
            Product product = productRepo.findById(productId).orElseThrow();

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setPriceAtPurchase(price);
            orderItemRepo.save(orderItem);
        }
        return savedOrder;
    }
}
