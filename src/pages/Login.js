import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });

      // Lưu token, role và userId vào localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if (res.data.userId) {
        localStorage.setItem("userId", res.data.userId);
      }

      alert("Đăng nhập thành công!");
      navigate("/"); // chuyển sang trang Home
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="App-header">
      <h2>Đăng nhập</h2>
      <input
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="logout-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
