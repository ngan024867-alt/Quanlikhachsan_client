import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");   // dùng email thay vì username
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Nếu đã đăng nhập thì không cần reset mật khẩu
  useEffect(() => {
    if (token) {
      alert("Bạn đã đăng nhập, không cần reset mật khẩu!");
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/rooms");
      }
    }
  }, [token, role, navigate]);

  const handleForgot = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/auth/forgot`, { email });
      alert("Mật khẩu mới đã được gửi vào email của bạn. Vui lòng kiểm tra hộp thư!");
      navigate("/login");
    } catch (err) {
      alert("Không tìm thấy email đã đăng ký!");
    }
  };

  return (
    <div className="App-header">
      <h2>Quên mật khẩu</h2>
      <input
        className="login-input"
        type="email"
        placeholder="Email đã đăng ký"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button className="logout-btn" onClick={handleForgot}>
        Reset Password
      </button>
    </div>
  );
}
