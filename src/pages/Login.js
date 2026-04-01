import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId || res.data.data?._id);

      // toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      // toast.error(err.response?.data?.error || "Lỗi đăng nhập!");
      alert(err.response?.data?.error || "Lỗi đăng nhập!");
    }
  };

  return (
    <div className="App-header">
      <h2>Đăng nhập</h2>
      <input
        className="login-input"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="logout-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
