import React, { useState } from "react";
import "../styles/orderDetailsModal.css";

const OrderDetailsModal = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, paymentMethod });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
             
            </select>
          </div>
          <div className="modal-actions">
            <button id="cancel-btn" type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetailsModal;