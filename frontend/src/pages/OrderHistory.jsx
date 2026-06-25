import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/orderHistory.css";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/orders/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="order-history-container"><p>Loading orders...</p></div>;

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found!</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p>📅 {new Date(order.orderDate).toLocaleDateString("en-IN")}</p>
              <p>📍 {order.address}</p>
              <p>💳 {order.paymentMethod}</p>
              <p>
                Payment Status:{" "}
                <span style={{ color: order.status === "PAID" ? "green" : "orange" }}>
                  {order.status}
                </span>
              </p>

              {/* Show ordered products with images */}
              <div className="order-items-list">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="order-item-row">
                    <img
                      src={item.product.img || "/images/placeholder.png"}
                      alt={item.product.title}
                      className="order-item-img"
                    />
                    <div className="order-item-details">
                      <span className="order-item-title">{item.product.title}</span>
                      <span className="order-item-qty">Qty: {item.quantity}</span>
                      <span className="order-item-price">₹{item.priceAtPurchase * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4>💰 Total: ₹{order.totalAmount}</h4>
              {order.razorpayPaymentId && (
                <p style={{ fontSize: "12px", color: "#aaa" }}>
                  Payment ID: {order.razorpayPaymentId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
