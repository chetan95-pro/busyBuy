import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>

      <div className="auth-box">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <button onClick={handleRegister} >Sign Up</button>
      </div>

      <Link to="/login" className="auth-link">
        Or SignIn instead
      </Link>
    </div>
  );
}
