import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import Footer from "./components/Footer.jsx";
import "./App.css";
import HeroSection from "./components/HeroSection.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Navigation from "./components/Navigation.jsx";
import Signup from "./pages/Signup.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import PrivateRoute from "./components/PrivateComponents.jsx"; // Import PrivateRoute component
function App() {
	return (
		<>
			<Navigation />
			<ToastContainer /> {/* Global Toast Container */}
			<Routes>
				<Route path="/" element={<HeroSection />} />
				<Route path="products" element={<ProductPage />} />
				<Route path="cart" element={<CartPage />} />
				<Route path="contact" element={<ContactPage />} />
				<Route path="about" element={<About />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route
					path="order-history"
					element={
						<PrivateRoute>
							<OrderHistory />
						</PrivateRoute>
					}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
