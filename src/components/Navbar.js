import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaHome,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaBoxOpen,
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      {/* LOGO */}
      <h2 className="logo">Busy Buy</h2>

      {/* RIGHT SIDE */}
      <div className="nav-links">
        <Link to="/">
          <FaHome /> Home
        </Link>

        {!user && (
          <Link to="/login">
            <FaSignInAlt /> SignIn
          </Link>
        )}

        {user && (
          <>
            <Link to="/orders">
              <FaBoxOpen /> My orders
            </Link>

            <Link to="/cart">
              <FaShoppingCart /> Cart
            </Link>

            <button onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
