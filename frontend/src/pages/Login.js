import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'styles/login.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Login successful!");
        console.log("Token:", data.token);
      } else {
        alert(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <div>
      <h2 className="logintext">Please login here</h2>
      <form onSubmit={handleLogin}>
        <div className="formfields">
          <label className="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="loginbtn" type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
