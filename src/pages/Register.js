import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");   // thêm email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      });
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login"); // chuyển sang trang Login
    } catch (err) {
      alert("Lỗi đăng ký!");
    }
  };

  return (
    <div className="App-header">
      <h2>Đăng ký</h2>
      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="logout-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
