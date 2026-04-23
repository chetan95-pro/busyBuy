# 🛒 BusyBuy – E-commerce React Application

BusyBuy is a modern e-commerce web application built using **React, Firebase
(Firestore + Auth), and Context API**. It demonstrates real-world features like
authentication, cart management, order processing, and real-time product
updates.

---

## 🚀 Live Features

- 🔐 **User Authentication** (Login / Register using Firebase Auth)
- 🛍️ **Product Listing** (Real-time data from Firestore)
- 🔎 **Search Functionality**
- 🎯 **Filter System**
  - Category filter
  - Price range filter

- 🛒 **Cart Management**
  - Add to cart
  - Increase / Decrease quantity
  - Remove items

- 📦 **Order Placement**
- 📜 **Order History Page**
- 🔔 **Toast Notifications** (React Toastify)
- ⚡ **Real-time updates** using Firestore (`onSnapshot`)

---

## 🏗️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Context API (State Management)
- CSS (Custom Styling)

### Backend / Services

- Firebase Authentication
- Firebase Firestore (Database)

### UI / Utilities

- React Icons
- React Toastify

---

## ⚙️ Project Architecture

```bash
src/
│
├── components/
│   ├── Navbar.js
│   ├── ProductCard.js
│   ├── SidebarFilter.js
│
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── Cart.js
│   ├── Orders.js
│
├── context/
│   ├── AuthContext.js
│   ├── ProductContext.js
│
├── firebase/
│   ├── config.js
│
├── utils/
│   ├── filter.js
│
└── styles/
    ├── styles.css
    ├── auth.css
```

---

## 🔥 Key Concepts Implemented

### 1. Context API (Global State)

- Centralized state for:
  - Products
  - Cart
  - Filters
  - Auth user

---

### 2. Real-time Firestore Integration

- Products are fetched using:

```js
onSnapshot(collection(db, "products"));
```

- Ensures UI updates instantly without refresh

---

### 3. Filtering System

- Implemented via reusable utility:

```js
filterProducts(products, { search, category, price });
```

---

### 4. Authentication Flow

- Firebase Auth used for:
  - Register
  - Login
  - Logout

- Protected routes implemented

---

### 5. Cart System

- Stored per user in Firestore:

```
usersCarts/{userId}/myCart
```

---

### 6. Orders System

- Orders stored as:

```
userOrders/{userId}/orders
```

---

## 🧪 How to Run Locally

### 1. Clone repo

```bash
git clone https://github.com/your-username/busybuy.git
cd busybuy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Firebase

Create a Firebase project and add config:

```js
// src/firebase/config.js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
};
```

---

### 4. Start project

```bash
npm start
```

---

## 📦 Data Seeding (Optional)

To auto-populate products:

```js
fetch("https://fakestoreapi.com/products");
```

Push data into Firestore using a script.

---

## 🎯 Why This is Production-Ready

- ✅ Clean architecture (separation of concerns)
- ✅ Scalable state management (Context API)
- ✅ Real-time database integration
- ✅ Modular components
- ✅ Reusable utility functions
- ✅ Proper UX (toast notifications, validation)
- ✅ Secure authentication (Firebase)

---

## 📸 Screenshots

> Add screenshots here (Home, Cart, Orders, Login)

---

## 🚀 Future Enhancements

- 🔄 Multi-category filter (checkbox)
- 📊 Sorting (price low-high, high-low)
- 💳 Payment integration (Stripe/Razorpay)
- 📱 Responsive mobile UI
- 🧠 Admin dashboard for product management

---

## 👨‍💻 Author

**Chetan Sonwane**

- 💼 Frontend Developer (React / Angular)
- 🌐 Passionate about building scalable UI systems

---

## 📄 License

This project is open-source and available under the MIT License.
