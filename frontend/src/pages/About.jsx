import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <>
      {/* HERO BANNER */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">Our Story</span>
          <h1>Built for Athletes.<br />Designed for Everyone.</h1>
          <p>
            Welcome to ShopKart — your destination for the latest Nike footwear
            and premium sportswear. We bring performance and style together,
            one step at a time.
          </p>
        </div>
        <div className="about-hero-image">
          <div className="about-shoe-emoji">👟</div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="about-stats">
        <div className="stat-card">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat-card">
          <h2>200+</h2>
          <p>Products</p>
        </div>
        <div className="stat-card">
          <h2>15+</h2>
          <p>Categories</p>
        </div>
        <div className="stat-card">
          <h2>4.9★</h2>
          <p>Average Rating</p>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="about-values">
        <div className="value-card">
          <div className="value-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To inspire every athlete and sports lover with innovative designs,
            premium quality, and unmatched performance.
          </p>
        </div>
        <div className="value-card">
          <div className="value-icon">🌟</div>
          <h3>Our Vision</h3>
          <p>
            A world where everyone has access to world-class sportswear that
            empowers them to reach their full potential.
          </p>
        </div>
        <div className="value-card">
          <div className="value-icon">🤝</div>
          <h3>Our Promise</h3>
          <p>
            Every product we carry is carefully curated for quality, comfort,
            and durability — because you deserve the best.
          </p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="about-cta">
        <h2>Ready to find your perfect pair?</h2>
        <p>Explore our full collection and join the ShopKart family.</p>
        <a href="/products" className="about-cta-btn">Browse Products</a>
      </section>
    </>
  );
};

export default About;
