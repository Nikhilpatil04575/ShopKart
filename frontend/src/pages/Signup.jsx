import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
	const navigate = useNavigate();
	const [confirmPassword, setConfirmPassword] = useState("");

	const [user, setUser] = useState({
		name: "",
		mobile: "",
		email: "",
		password: "",
	});
	const onInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const { name, mobile, email, password } = user;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			const response = await axios.post("http://localhost:8080/users", user);

			console.log("Response from backend:", response.data);
			toast.success(`${name} Registered Suceesfully`, {
				position: "top-right",
				autoClose: 2000, // Disappears after 2 seconds
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			navigate("/login");
		} catch (error) {
			if (error.response && error.response.status === 409) {
				alert(error.response.data); // Will show: "User Already Exists"
			} else {
				console.error("Unexpected error:", error);
				alert("Something went wrong. Please try again.");
			}
		}
	};

	return (
		<div className="signup-container">
			<div className="signup-box">
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => onInputChange(e)}
						required
					/>
					<input
						type="tel"
						placeholder="Enter your mobile number"
						value={mobile}
						name="mobile"
						onChange={(e) => onInputChange(e)}
						pattern="[0-9]{10}"
						title="Enter a valid 10-digit mobile number"
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => onInputChange(e)}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => onInputChange(e)}
						required
					/>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm your password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<button type="submit">Sign Up</button>
				</form>
				<p>
					Already have an account? <Link to="/login">Login here</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
