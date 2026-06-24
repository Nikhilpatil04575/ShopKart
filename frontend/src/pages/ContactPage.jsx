import "../styles/contact.css";

const ContactPage = () => {
	return (
		<div className="contact-page">
			{/* HERO */}
			<div className="contact-hero">
				<h1>Get in Touch</h1>
				<p>
					We'd love to hear from you! Reach out with questions,
					feedback, or just to say hello.
				</p>
			</div>

			{/* BODY */}
			<div className="contact-body">
				{/* FORM */}
				<div className="contact-form-card">
					<h2>Send a Message</h2>
					<form className="contact-form">
						<input type="text" placeholder="Your Name" required />
						<input type="email" placeholder="Your Email" required />
						<textarea placeholder="Your Message" rows="5" required></textarea>
						<button type="submit" className="contact-send-btn">
							Send Message
						</button>
					</form>
				</div>

				{/* INFO */}
				<div className="contact-info-card">
					<h2>Contact Info</h2>
					<div className="info-item">
						<div className="info-icon">📍</div>
						<div className="info-text">
							<h4>Address</h4>
							<p>123 ShopKart Street, Sports City, India</p>
						</div>
					</div>
					<div className="info-item">
						<div className="info-icon">📧</div>
						<div className="info-text">
							<h4>Email</h4>
							<p>support@shopkart.com</p>
						</div>
					</div>
					<div className="info-item">
						<div className="info-icon">📞</div>
						<div className="info-text">
							<h4>Phone</h4>
							<p>+91 12345 67890</p>
						</div>
					</div>
					<div className="info-item">
						<div className="info-icon">🕐</div>
						<div className="info-text">
							<h4>Business Hours</h4>
							<p>Mon–Sat: 9:00 AM – 6:00 PM IST</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
