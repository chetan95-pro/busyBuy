import { useProduct } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useProduct();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!user) {
      navigate("/login"); // 🔥 redirect
      return;
    }

    addToCart(product);
  };

  return (
    <div className="card">
      <img src={product.image} alt="" />
      <h4>{product.title}</h4>
      <p>₹ {product.price}</p>

      <button onClick={handleAdd}>Add To Cart</button>
    </div>
  );
}
