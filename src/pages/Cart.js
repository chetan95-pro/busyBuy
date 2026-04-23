import { useProduct } from "../context/ProductContext";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, placeOrder } =
    useProduct();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePurchase = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    await placeOrder();
    toast.success("Order placed successfully!");
  };

  return (
    <div className="cart-container">
      {/* SIDEBAR */}
      <div className="cart-sidebar">
        <h3>TotalPrice:- ₹{total}</h3>

        <button
          className="purchase-btn"
          onClick={handlePurchase}
          disabled={cart.length === 0}
        >
          Purchase
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="cart-products">
        {cart.length === 0 ? (
          <h2>No Items in Cart</h2>
        ) : (
          cart.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt="product" />

              <h4>{item.title}</h4>

              <p>₹ {item.price}</p>

              {/* QUANTITY */}
              <div className="qty-box">
                <button onClick={() => decreaseQty(item.id)}>-</button>

                <span>{item.qty}</span>

                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              {/* REMOVE */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove From Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
