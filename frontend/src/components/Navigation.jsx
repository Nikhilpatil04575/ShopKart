import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isLoginPage = location.pathname === "/login";

	const isLoggedIn = localStorage.getItem("token") !== null;
	console.log("isLoggedIn:", isLoggedIn);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<nav className="container">
			<div className="logo">
				<img src="/images/shopkart.png" alt="logo" />
			</div>

			<ul>
				<li>
					<Link
						to="/"
						className={location.pathname === "/" ? "active-link" : ""}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						to="/products"
						className={location.pathname === "/products" ? "active-link" : ""}
					>
						Products
					</Link>
				</li>
				<li>
					<Link
						to="/about"
						className={location.pathname === "/about" ? "active-link" : ""}
					>
						About
					</Link>
				</li>
				<li>
					<Link
						to="/contact"
						className={location.pathname === "/contact" ? "active-link" : ""}
					>
						Contact
					</Link>
				</li>

				{isLoggedIn && (
					<li>
						<Link
							to="/cart"
							className={location.pathname === "/cart" ? "active-link" : ""}
						>
							Cart
						</Link>
					</li>
				)}

				{/* ✅ Show Order History only if logged in */}
				{isLoggedIn && (
					<li>
						<Link
							to="/order-history"
							className={
								location.pathname === "/order-history" ? "active-link" : ""
							}
						>
							Order History
						</Link>
					</li>
				)}
			</ul>

			<div style={{ display: "flex", gap: "1rem" }}>
				{/* ✅ Show Sign in if not logged in */}
				{!isLoggedIn && (
					<Link
						to="/login"
						className={isLoginPage ? "hidden-link" : "login-btn"}
					>
						Sign in
					</Link>
				)}

				{isLoggedIn && (
					<button onClick={handleLogout} className="logout-btn">
						Logout
					</button>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
