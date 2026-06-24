import React, { useState } from "react";
import "../styles/orderDetailsModal.css";

const OrderDetailsModal = ({ isOpen, onClose, onSubmit, totalAmount }) => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, paymentMethod, totalAmount });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="address">Delivery Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="payment-method">Payment Method:</label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Razorpay">💳 Razorpay (UPI / Card / Net Banking)</option>
              <option value="Cash on Delivery">🚚 Cash on Delivery</option>
            </select>
          </div>
          <p style={{ fontWeight: "bold" }}>Total: ₹{totalAmount}</p>
          <div className="modal-actions">
            <button id="cancel-btn" type="button" onClick={onClose}>Cancel</button>
            <button type="submit">
              {paymentMethod === "Razorpay" ? "Pay Now" : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
