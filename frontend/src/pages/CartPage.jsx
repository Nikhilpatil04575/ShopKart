import { useEffect, useState } from "react";
import "../styles/cart.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetailsModal from "../components/OrderDetailsModal";
import axios from "axios";

const CartPage = () => {
	const [cartItems, setCartItems] = useState([]);
	const [totalSum, setTotalSum] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchCart = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Please login to view your cart.");
				return;
			}

			const res = await axios.get("http://localhost:8080/api/cart", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("Cart Items:", res.data);
			setCartItems(Array.isArray(res.data) ? res.data : []);
		} catch (error) {
			console.error("Failed to fetch cart", error);
			toast.error("Could not load cart items.");
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	useEffect(() => {
		const total = cartItems.reduce(
			(sum, item) => sum + item.quantity * item.product.price,
			0
		);
		setTotalSum(total);
	}, [cartItems]);

	const removeItem = async (id) => {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`http://localhost:8080/api/cart/remove/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setCartItems(cartItems.filter((item) => item.product.id !== id));
		} catch (error) {
			toast.error("Failed to remove item");
		}
	};

	const clearCart = async () => {
		try {
			const token = localStorage.getItem("token");
			const ids = cartItems.map((item) => item.product.id);
			console.log(ids);
			for (let id of ids) {
				await axios.delete(`http://localhost:8080/api/cart/remove/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			}
			setCartItems([]);
		} catch (error) {
			toast.error("Failed to clear cart");
		}
	};

	const handleOrder = async (orderDetails) => {
		try {
			toast.success("Order placed successfully!");
			clearCart();
		} catch (error) {
			toast.error("Failed to place order");
		}
		console.log("Order Details:", orderDetails);
	};

	return (
		<>
			<div className="cart-container">
				<h1>Your Cart</h1>
				{cartItems.length === 0 ? (
					<p>Your cart is empty!</p>
				) : (
					<>
						<div className="cart-items">
							{cartItems.map((item) => (
								<div key={item.id} className="cart-item">
									<img
										src={item.product.img || "/images/placeholder.png"}
										alt={item.product.title}
									/>
									<div>
										<h3>{item.product.title}</h3>
										<p>Quantity: {item.quantity}</p>
										<p>Price: ₹{item.product.price * item.quantity}</p>
									</div>
									<button onClick={() => removeItem(item.product.id)}>
										Remove
									</button>
								</div>
							))}
						</div>
						<h2>Total: ₹{totalSum}</h2>
						<div className="button-container">
							<button className="clear-btn" onClick={clearCart}>
								Clear Cart
							</button>
							<button
								className="clear-btn"
								onClick={() => setIsModalOpen(true)}
							>
								Place Order
							</button>
						</div>
					</>
				)}
			</div>

			<OrderDetailsModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleOrder}
			/>
		</>
	);
};

export default CartPage;
