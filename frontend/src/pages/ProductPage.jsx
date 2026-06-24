import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/product.css";
import axios from "axios";

const ProductPage = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				console.warn("No token found. Redirecting to login.");
				window.location.href = "/login";
				return;
			}

			try {
				const response = await axios.get("http://localhost:8080/api/products", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setProducts(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching products:", error);
				if (error.response?.status === 403 || error.response?.status === 401) {
					window.location.href = "/login"; // 👈 Redirect if unauthorized
				}
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const handleAddToCart = async (item) => {
		dispatch(addToCart(item));
		console.log("Item added to cart:", item);
		console.log(item.id, item.title, item.price);
		try {
			await axios.post(
				"http://localhost:8080/api/cart/add",
				{
					productId: item.id,
					quantity: 1,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			toast.success(`${item.title} added to cart!`, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			toast.error("Failed to add to cart.");
		}
	};

	if (loading) return <div className="loading-state">Loading products</div>;

	return (
		<div className="product-container">
			<h1>Our Products</h1>
			<div className="product-grid">
				{products.map((item) => (
					<div className="product-card" key={item.id}>
						<img src={item.img} alt={item.title} />
						<h3>{item.title}</h3>
						<p className="product-desc">{item.desc}</p>
						<p className="product-price">₹{item.price?.toLocaleString()}</p>
						<button className="buy-btn" onClick={() => handleAddToCart(item)}>
							Add to Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductPage;
