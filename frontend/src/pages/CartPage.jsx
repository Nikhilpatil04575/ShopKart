import { useEffect, useState } from "react";
import "../styles/cart.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetailsModal from "../components/OrderDetailsModal";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

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

			const res = await axios.get(`${BASE_URL}/api/cart`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

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
			await axios.delete(`${BASE_URL}/api/cart/remove/${id}`, {
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

			for (let id of ids) {
				await axios.delete(`${BASE_URL}/api/cart/remove/${id}`, {
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
		const token = localStorage.getItem("token");

		if (orderDetails.paymentMethod === "Cash on Delivery") {
			try {
				const cartItemsPayload = cartItems.map((item) => ({
					productId: item.product.id,
					quantity: item.quantity,
					price: item.product.price,
				}));
				await axios.post(
					`${BASE_URL}/api/orders/place-cod-order`,
					{
						address: orderDetails.address,
						amount: totalSum,
						cartItems: cartItemsPayload,
					},
					{ headers: { Authorization: `Bearer ${token}` } }
				);
				toast.success("🚚 Order placed! Pay on delivery.");
				clearCart();
			} catch (err) {
				toast.error("Failed to place COD order.");
			}
			return;
		}

		try {
			// Step 1: Create Razorpay order on backend
			const res = await axios.post(
				`${BASE_URL}/api/orders/create-razorpay-order`,
				{ amount: totalSum },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			const { razorpayOrderId, amount, currency, keyId } = res.data;

			// Step 2: Open Razorpay popup
			const options = {
				key: keyId,
				amount: amount,
				currency: currency,
				name: "Nike Store",
				description: "Order Payment",
				order_id: razorpayOrderId,
				handler: async function (response) {
					// Step 3: Verify + save order with product details
					try {
						// Build cartItems array to send to backend
						const cartItemsPayload = cartItems.map((item) => ({
							productId: item.product.id,
							quantity: item.quantity,
							price: item.product.price,
						}));

						await axios.post(
							`${BASE_URL}/api/orders/verify-payment`,
							{
								razorpayOrderId: razorpayOrderId,
								razorpayPaymentId: response.razorpay_payment_id,
								razorpaySignature: response.razorpay_signature,
								address: orderDetails.address,
								amount: totalSum,
								cartItems: cartItemsPayload,   // ← product + qty info
							},
							{ headers: { Authorization: `Bearer ${token}` } }
						);
						toast.success("🎉 Payment successful! Order placed.");
						clearCart();
					} catch (err) {
						toast.error("Payment verification failed.");
					}
				},
				prefill: {
					name: "Customer",
					email: localStorage.getItem("email") || "",
				},
				theme: { color: "#000000" },
			};

			const rzp = new window.Razorpay(options);
			rzp.on("payment.failed", function () {
				toast.error("Payment failed. Please try again.");
			});
			rzp.open();
		} catch (error) {
			toast.error("Could not initiate payment.");
		}
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
									<button class="clear-btn" onClick={() => removeItem(item.product.id)}>
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
								className="placed-btn"
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
				totalAmount={totalSum}
			/>

		</>
	);
};

export default CartPage;
