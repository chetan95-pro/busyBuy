import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import "../styles/orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "userOrders", user.uid, "orders"),
    );

    const data = snapshot.docs.map((doc) => doc.data());
    setOrders(data);
  };

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>

      {orders.map((order, index) => (
        <div key={index} className="order-box">
          <h3>Ordered On: {order.createdAt}</h3>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.qty}</td>
                  <td>₹ {item.price * item.qty}</td>
                </tr>
              ))}

              <tr className="total-row">
                <td colSpan="3">Total</td>
                <td>₹ {order.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
