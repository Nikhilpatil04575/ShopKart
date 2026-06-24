import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import items from "./Items";
import "../styles/product.css";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const isLoggedIn = localStorage.getItem("token") !== null;

  // Get unique categories from items
  const categories = ["All", ...new Set(items.map((item) => item.category))];

  // Filter items based on the selected category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      toast.info("Please log in to add items to your cart.", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }
    dispatch(addToCart(item));
    toast.success(`${item.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-wrapper">
        <main className="hero">
          <div className="hero-content">
            <h1>
              Your Feet Deserve <span>The Best</span>
            </h1>
            <p className="hero-desc">
              Discover premium Nike footwear crafted for performance and style.
              Step into comfort, step into greatness.
            </p>

            <div className="hero-btn">
              <a href="/products" className="hero-cta">
                Shop Now
              </a>
              <span className="hero-new-badge">🔥 New Launch</span>
            </div>

            <div className="shopping">
              <p>Also Available On</p>
              <div className="brand-icons">
                <img src="/images/amazon.png" alt="amazon-logo" />
                <img src="/images/flipkart.png" alt="flipkart-logo" />
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero-image.png" alt="Nike shoe hero" />
          </div>
        </main>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="filtered-items">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {filteredItems.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p className="product-desc">{item.desc}</p>
              <p className="product-price">₹{item.price.toLocaleString()}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;