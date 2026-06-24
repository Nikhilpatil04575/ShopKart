import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../store/CartSlice";
import "../styles/orderHistory.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.orders.history);

  const handleCancelOrder = (index) => {
    dispatch(cancelOrder(index));
    toast.success(`Order Cancel`, {
      position: "top-right",
      autoClose: 2000, // Disappears after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found!</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <h3>Order #{index + 1}</h3>
              <p>Date: {order.date}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} - Quantity: {item.quantity} - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <h4>Total: ₹{order.total}</h4>
              <button
                className="cancel-order-btn"
                onClick={() => handleCancelOrder(index)}
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;