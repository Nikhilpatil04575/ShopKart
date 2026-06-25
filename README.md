# 🛒 ShopKart — Full‑Stack E‑Commerce Web Application

<div align="center">

![ShopKart](https://img.shields.io/badge/ShopKart-E--Commerce-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?style=for-the-badge&logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-02042B?style=for-the-badge)

**A production-ready, full-stack e-commerce platform with JWT authentication, shopping cart, and Razorpay payment integration.**

</div>

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](./screenshots/Screenshot%202026-06-25%20160546.png)

### 🛍️ Products Page
![Products Page](./screenshots/Screenshot%202026-06-25%20160606.png)

### 🛒 Cart Page
![Cart Page](./screenshots/Screenshot%202026-06-25%20160628.png)

### 💳 Razorpay Payment Gateway
![Payment Gateway](./screenshots/Screenshot%202026-06-25%20162310.png)

### ✅ Payment Successful
![Payment Successful](./screenshots/Screenshot%202026-06-25%20162820.png)

### 📜 Order History
![Order History](./screenshots/Screenshot%202026-06-25%20162845.png)

---

## ✨ Features

- 🔐 **User Authentication** — Register & Login with JWT-based security (BCrypt password hashing)
- 🛍️ **Product Catalog** — Browse a rich catalog across multiple categories (Fashion, Sports, Books, Electronics)
- 🛒 **Shopping Cart** — Add/remove items, view cart total in real-time with Redux-powered state management
- 💳 **Razorpay Payment Integration** — Secure online payments via Cards, Netbanking, Wallets & Pay Later
- 📦 **Cash on Delivery (COD)** — Place orders without online payment
- 📜 **Order History** — View all past orders with item details, payment status, and delivery address
- 🔒 **Protected Routes** — Private route guards for pages that require authentication
- 📱 **Responsive Design** — Works seamlessly across desktop and mobile

---

## 🗂️ Project Structure

```
Nike/
├── frontend/                        # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                  # Images and static assets
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx      # Landing page hero banner
│   │   │   ├── Items.jsx            # Product card component
│   │   │   ├── Navigation.jsx       # Navbar with cart badge
│   │   │   ├── OrderDetailsModal.jsx
│   │   │   └── PrivateComponents.jsx # Route guard wrapper
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ProductPage.jsx      # Products listing
│   │   │   ├── CartPage.jsx         # Cart + Razorpay checkout
│   │   │   ├── OrderHistory.jsx     # Past orders
│   │   │   ├── About.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── store/
│   │   │   ├── Store.jsx            # Redux store (with redux-persist)
│   │   │   └── CartSlice.jsx        # Cart reducer & actions
│   │   ├── styles/                  # Component-level CSS
│   │   ├── utils/                   # Utility helpers
│   │   ├── App.jsx                  # Routing configuration
│   │   └── main.jsx                 # React entry point
│   ├── .env.example                 # Frontend env template
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/                         # Spring Boot Backend
    └── src/main/java/com/shopkart/shopkartbackend/
        ├── ShopkartBackendApplication.java
        ├── config/                  # CORS & Security configuration
        ├── controller/
        │   ├── AuthController.java  # Login endpoint
        │   ├── CartController.java  # Cart CRUD
        │   ├── ProductController.java
        │   ├── OrderController.java # Razorpay & COD orders
        │   └── UserController.java  # Registration
        ├── dto/
        │   ├── AuthRequest.java
        │   └── AuthResponse.java
        ├── model/                   # JPA Entities (User, Product, Cart, Order)
        ├── repository/              # Spring Data JPA Repositories
        ├── security/
        │   ├── JwtUtil.java         # JWT generation & validation
        │   ├── JwtFilter.java       # Request filter
        │   └── CustomUserDetailsService.java
        └── services/                # Business logic layer
    └── src/main/resources/
        └── application.properties.example
    └── pom.xml
```

---

## 🚀 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 19.0 |
| **Build Tool** | Vite | 6.2 |
| **Routing** | React Router DOM | 7.4 |
| **State Management** | Redux Toolkit + Redux Persist | 2.6 |
| **HTTP Client** | Axios | 1.10 |
| **UI Icons** | React Icons | 5.5 |
| **Notifications** | React Toastify | 11.0 |
| **Backend** | Spring Boot | 3.5.3 |
| **Security** | Spring Security + JWT (JJWT) | 0.11.5 |
| **ORM** | Spring Data JPA + Hibernate | — |
| **Database** | MySQL | 8+ |
| **Payment** | Razorpay Java SDK | 1.4.3 |
| **Utilities** | Lombok | — |
| **Java Version** | Java | 17 |

---

## ⚙️ Local Setup & Installation

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18+
- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/) (or use the included `mvnw` wrapper)
- [MySQL 8+](https://dev.mysql.com/downloads/)
- A [Razorpay account](https://razorpay.com/) (free test mode available)

---

### 1️⃣ Backend Setup

**a) Clone the repository**
```bash
git clone https://github.com/Nikhilpatil04575/ShopKartDeploy.git
cd ShopKartDeploy/backend
```

**b) Configure `application.properties`**

Copy the example file and fill in your credentials:
```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Edit `application.properties`:
```properties
spring.application.name=nikebackend
spring.jpa.hibernate.ddl-auto=update

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/shopkart?createDatabaseIfNotExist=true
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=false
spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=never

# Razorpay Keys (from https://dashboard.razorpay.com)
razorpay.key.id=YOUR_RAZORPAY_KEY_ID
razorpay.key.secret=YOUR_RAZORPAY_KEY_SECRET

# JWT Secret (min 32 characters)
jwt.secret=YOUR_LONG_RANDOM_JWT_SECRET_STRING
```

**c) Run the backend**
```bash
# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# OR using system Maven
mvn clean spring-boot:run
```

> Backend starts at: **`http://localhost:8080`**

---

### 2️⃣ Frontend Setup

**a) Navigate to the frontend directory**
```bash
cd ../frontend
```

**b) Install dependencies**
```bash
npm install
```

**c) Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8080
```

> For production, set this to your deployed backend URL (e.g., on Render or Railway).

**d) Start the development server**
```bash
npm run dev
```

> Frontend available at: **`http://localhost:5173`**

---

## 🌐 API Reference

All protected endpoints require the header: `Authorization: Bearer <JWT_TOKEN>`

### 🔑 Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/auth/login` | ❌ | Login with email & password → returns JWT token |
| `POST` | `/api/users/register` | ❌ | Register a new user account |

### 🛍️ Products

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/api/products` | ✅ | Fetch all available products |

### 🛒 Cart

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/api/cart` | ✅ | Get cart items for the logged-in user |
| `POST` | `/api/cart/add` | ✅ | Add a product to the cart |
| `DELETE` | `/api/cart/remove/{id}` | ✅ | Remove an item from the cart by ID |

### 📦 Orders

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/orders/create-razorpay-order` | ✅ | Create a Razorpay payment order |
| `POST` | `/api/orders/verify-payment` | ✅ | Verify Razorpay payment signature & save order |
| `POST` | `/api/orders/place-cod-order` | ✅ | Place a Cash on Delivery order |
| `GET` | `/api/orders/history` | ✅ | Fetch order history for the logged-in user |

---

## 💳 Razorpay Payment Flow

```
User clicks "Place Order"
        │
        ▼
Frontend → POST /api/orders/create-razorpay-order  (amount in INR)
        │
        ▼
Backend creates Razorpay order
Returns → { razorpayOrderId, amount, keyId }
        │
        ▼
Razorpay checkout modal opens (Cards / Netbanking / Wallet / UPI)
        │
        ▼
Razorpay returns → { paymentId, orderId, signature }
        │
        ▼
Frontend → POST /api/orders/verify-payment  (HMAC-SHA256 signature check)
        │
        ▼
Backend verifies signature → saves Order to DB → cart is cleared
        │
        ▼
✅ "Payment Successful" screen shown to user
```

---

## 🔐 Security Architecture

| Concern | Implementation |
|---------|---------------|
| Password hashing | BCrypt via Spring Security |
| Authentication | Stateless JWT (HMAC-SHA256 signed) |
| Request validation | `JwtFilter` intercepts every request |
| CORS | Configured for `http://localhost:5173` |
| Secret management | Credentials stored in `application.properties` (git-ignored) |

---




## 🗄️ Database Schema

```
users          → id, name, email (unique), password (BCrypt)
products       → id, name, description, price, imageUrl, category
cart           → id, user_id (FK), product_id (FK)
orders         → id, user_id (FK), amount, address, payment_type,
                 razorpay_order_id, razorpay_payment_id, created_at
order_items    → id, order_id (FK), product_id (FK), quantity, price
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---



---

<div align="center">
  Made with ❤️ by <strong>Nikhil Patil</strong>
</div>
