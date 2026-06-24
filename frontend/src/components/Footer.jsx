import React from "react";
import "../styles/Footer.css";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<h2>Shop<span>Kart</span></h2>
				<p>Shop quality products with confidence.</p>
				<div className="social-icons">
					<FaInstagram />
					<FaFacebook />
					<FaTwitter />
					<FaYoutube />
				</div>
			</div>
			<div className="footer-bottom">
				<p>© 2025 ShopKart. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
