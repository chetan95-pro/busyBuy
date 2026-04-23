import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const seedProducts = async () => {
  try {
    console.log("Fetching products...");

    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    for (let item of products) {
      await addDoc(collection(db, "products"), {
        title: item.title,
        price: item.price,
        category: item.category,
        image: item.image,
      });
    }

    console.log("✅ Products added to Firestore!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
};
