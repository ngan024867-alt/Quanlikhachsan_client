import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Nếu đã đăng nhập thì điều hướng theo phân quyền
  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/rooms");
      }
    }
  }, [token, role, navigate]);

  return (
    <div className="App-header">
      <h1>Quản lý khách sạn</h1>
      <p>Chào mừng bạn đến với hệ thống quản lý khách sạn. Vui lòng đăng nhập hoặc đăng ký để tiếp tục.</p>
      <div style={{ marginTop: "20px" }}>
        <button className="logout-btn" onClick={() => navigate("/login")}>Đăng nhập</button>
        <button className="logout-btn" onClick={() => navigate("/register")} style={{ marginLeft: "10px" }}>Đăng ký</button>
      </div>
    </div>
  );
}
