import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://localhost:8080/api/auth/login",
				{
					email,
					password,
				}
			);

			const { token, user } = response.data;

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));

			toast.success("Login Success!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});

			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (error) {
			if (error.response && error.response.status === 401) {
				toast.error("Incorrect email or password", {
					position: "top-right",
					autoClose: 3000,
				});
			} else if (error.response && error.response.status === 404) {
				toast.error("User not found", {
					position: "top-right",
					autoClose: 3000,
				});
			} else {
				toast.error("Something went wrong. Please try again.", {
					position: "top-right",
					autoClose: 3000,
				});
			}
		}
	};

	return (
		<div className="login-page">
			<div className="login-card">
				<div className="login-icon">👟</div>
				<h1>Welcome Back</h1>
				<p className="login-subtitle">Sign in to your ShopKart account</p>
				<form onSubmit={handleSubmit}>
					<div className="input-group">
						<label htmlFor="email">Email Address</label>
						<input
							id="email"
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="login-submit-btn">
						Sign In
					</button>
				</form>
				<p className="login-footer">
					Don't have an account?{" "}
					<Link to="/signup" className="register-link">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
