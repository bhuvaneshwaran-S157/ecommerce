# ⚡ QuickCart — Full-Stack E-Commerce App

A full-stack e-commerce application built with **Java Spring Boot** (backend) and **React + Tailwind CSS v4** (frontend).

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Backend   | Java 17, Spring Boot 3.2, Spring Data JPA |
| Database  | MySQL 8                                 |
| Frontend  | React 18, Vite, Tailwind CSS v4         |
| HTTP      | Axios, REST APIs                        |

---

## Features

- 🛍️ Product listing with search, filter by category, sort, pagination
- 📦 Product detail page with stock status and image
- ⭐ Product reviews & star ratings
- 🛒 Cart management (add, update quantity, remove, clear)
- 💳 Checkout with shipping address & payment method selection
- 📋 Order history and order detail view
- 👤 User registration, login, profile management
- 🌱 Auto-seeded sample products on first run

---

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8 running locally

---

## Setup & Run

### 1. Database

Make sure MySQL is running. The app will auto-create the `quickcart` database.

Update credentials in `backend/src/main/resources/application.properties` if needed:
```properties
spring.datasource.username=root
spring.datasource.password=root
```

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on: http://localhost:8080

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: http://localhost:5173

---

## API Endpoints

| Method | Endpoint                              | Description              |
|--------|---------------------------------------|--------------------------|
| POST   | /api/users/register                   | Register user            |
| POST   | /api/users/login                      | Login                    |
| GET    | /api/users/{id}                       | Get user profile         |
| PUT    | /api/users/{id}                       | Update profile           |
| GET    | /api/products                         | List products (paginated)|
| GET    | /api/products/{id}                    | Get product              |
| GET    | /api/products/categories              | List categories          |
| POST   | /api/products                         | Create product           |
| PUT    | /api/products/{id}                    | Update product           |
| DELETE | /api/products/{id}                    | Delete product           |
| GET    | /api/cart/{userId}                    | Get cart                 |
| POST   | /api/cart/{userId}/items              | Add item to cart         |
| PUT    | /api/cart/{userId}/items/{itemId}     | Update item quantity     |
| DELETE | /api/cart/{userId}/items/{itemId}     | Remove item              |
| DELETE | /api/cart/{userId}                    | Clear cart               |
| POST   | /api/orders/checkout/{userId}         | Place order              |
| GET    | /api/orders/user/{userId}             | Get user orders          |
| GET    | /api/orders/{orderId}                 | Get order detail         |
| PATCH  | /api/orders/{orderId}/status          | Update order status      |
| GET    | /api/products/{productId}/reviews     | Get reviews              |
| POST   | /api/products/{productId}/reviews     | Add review               |
