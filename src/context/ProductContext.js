import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { filterProducts } from "../utils/filter";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // ✅ FILTER STATES
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100000);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const placeOrder = async () => {
    const user = auth.currentUser;

    if (!user || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderRef = collection(db, "userOrders", user.uid, "orders");

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    await addDoc(orderRef, {
      items: cart,
      total,
      createdAt: new Date().toISOString().split("T")[0],
    });

    await clearCart();

    toast.success("Order placed successfully!");
  };

  // 🔥 Fetch Cart
  const fetchCart = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "usersCarts", user.uid, "myCart"),
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCart(data);
  };

  // 🛒 Add to Cart
  const addToCart = async (product) => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const cartRef = doc(
      db,
      "usersCarts",
      user.uid,
      "myCart",
      product.id.toString(),
    );

    const exists = cart.find((p) => p.id === product.id);

    if (exists) {
      await updateDoc(cartRef, { qty: exists.qty + 1 });

      setCart(
        cart.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p)),
      );

      toast.info("Quantity updated");
    } else {
      await setDoc(cartRef, { ...product, qty: 1 });

      setCart([...cart, { ...product, qty: 1 }]);

      toast.success("Added to cart");
    }
  };

  const increaseQty = async (id) => {
    const user = auth.currentUser;

    const item = cart.find((p) => p.id === id);

    const ref = doc(db, "usersCarts", user.uid, "myCart", id.toString());

    await updateDoc(ref, { qty: item.qty + 1 });

    setCart(cart.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  };

  const decreaseQty = async (id) => {
    const user = auth.currentUser;

    const item = cart.find((p) => p.id === id);

    const ref = doc(db, "usersCarts", user.uid, "myCart", id.toString());

    if (item.qty === 1) {
      await deleteDoc(ref);
      setCart(cart.filter((p) => p.id !== id));
    } else {
      await updateDoc(ref, { qty: item.qty - 1 });

      setCart(cart.map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p)));
    }
  };

  const clearCart = async () => {
    const user = auth.currentUser;

    const snapshot = await getDocs(
      collection(db, "usersCarts", user.uid, "myCart"),
    );

    const promises = snapshot.docs.map((d) =>
      deleteDoc(doc(db, "usersCarts", user.uid, "myCart", d.id)),
    );

    await Promise.all(promises);
    setCart([]);
  };

  const removeFromCart = async (id) => {
    const user = auth.currentUser;

    await deleteDoc(doc(db, "usersCarts", user.uid, "myCart", id.toString()));

    setCart(cart.filter((item) => item.id !== id));

    toast.warn("Item removed");
  };

  // 🔥 REALTIME PRODUCTS
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    });

    fetchCart();

    return () => unsub();
  }, []);

  // ✅ APPLY FILTER
  useEffect(() => {
    const result = filterProducts(products, {
      search,
      category,
      price,
    });

    setFilteredProducts(result);
  }, [products, search, category, price]);

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        cart,
        setSearch,
        setCategory,
        setPrice,
        removeFromCart,
        addToCart,
        increaseQty,
        placeOrder,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
