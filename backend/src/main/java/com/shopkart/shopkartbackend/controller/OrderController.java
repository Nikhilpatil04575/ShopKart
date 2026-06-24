package com.nike.nikebackend.controller;

import com.nike.nikebackend.model.Order;
import com.nike.nikebackend.security.JwtUtil;
import com.nike.nikebackend.services.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    private String extractEmail(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return jwtUtil.extractUsername(token);
    }

    // API 1: Create Razorpay order
    @PostMapping("/create-razorpay-order")
    public ResponseEntity<?> createRazorpayOrder(@RequestBody Map<String, Object> data,
            HttpServletRequest request) {
        try {
            double amount = Double.parseDouble(data.get("amount").toString());
            String razorpayOrderId = orderService.createRazorpayOrder(amount);
            return ResponseEntity.ok(Map.of(
                    "razorpayOrderId", razorpayOrderId,
                    "amount", (int) (amount * 100),
                    "currency", "INR",
                    "keyId", razorpayKeyId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create order: " + e.getMessage());
        }
    }

    // API 2: Verify payment + save order with items
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> data,
            HttpServletRequest request) {
        String email = extractEmail(request);
        String razorpayOrderId = data.get("razorpayOrderId").toString();
        String razorpayPaymentId = data.get("razorpayPaymentId").toString();
        String signature = data.get("razorpaySignature").toString();
        String address = data.get("address").toString();
        double amount = Double.parseDouble(data.get("amount").toString());

        // cartItems: [{ productId, quantity, price }, ...]
        List<Map<String, Object>> cartItems = (List<Map<String, Object>>) data.get("cartItems");

        boolean isValid = orderService.verifyPayment(razorpayOrderId, razorpayPaymentId, signature);

        if (isValid) {
            Order order = orderService.saveOrder(email, address, amount,
                    razorpayOrderId, razorpayPaymentId, cartItems);
            return ResponseEntity.ok(Map.of("message", "Payment verified!", "orderId", order.getId()));
        } else {
            return ResponseEntity.badRequest().body("Payment verification failed!");
        }
    }

    // API 3: Get order history
    @GetMapping("/history")
    public ResponseEntity<List<Order>> getOrderHistory(HttpServletRequest request) {
        String email = extractEmail(request);
        return ResponseEntity.ok(orderService.getOrderHistory(email));
    }

    // API 4: Place Cash on Delivery order
    @PostMapping("/place-cod-order")
    public ResponseEntity<?> placeCodOrder(@RequestBody Map<String, Object> data,
                                            HttpServletRequest request) {
        try {
            String email = extractEmail(request);
            String address = data.get("address").toString();
            double amount = Double.parseDouble(data.get("amount").toString());
            List<Map<String, Object>> cartItems = (List<Map<String, Object>>) data.get("cartItems");

            Order order = orderService.saveCodOrder(email, address, amount, cartItems);
            return ResponseEntity.ok(Map.of("message", "COD order placed!", "orderId", order.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to place COD order: " + e.getMessage());
        }
    }
}
