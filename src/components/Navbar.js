import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Hotel Management</h2>

      {/* Nút hamburger */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {!token && (
          <>
            <li><Link to="/login">Đăng nhập</Link></li>
            <li><Link to="/register">Đăng ký</Link></li>
            <li><Link to="/forgot">Quên mật khẩu</Link></li>
          </>
        )}

        {token && role === "user" && (
          <>
            <li><Link to="/rooms">Danh sách phòng</Link></li>
            <li><Link to="/booking">Đặt phòng</Link></li>
            <li><Link to="/notifications">Thông báo</Link></li>
            <li><Link to="/services">Dịch vụ bổ sung</Link></li>
          </>
        )}

        {token && role === "admin" && (
          <>
            <li><Link to="/admin">Trang quản trị</Link></li>
            <li><Link to="/admin/rooms">Quản lý phòng</Link></li>
            <li><Link to="/admin/bookings">Quản lý đặt phòng</Link></li>
            <li><Link to="/admin/users">Quản lý người dùng</Link></li>
            <li><Link to="/admin/services">Quản lý dịch vụ bổ sung</Link></li>
          </>
        )}

        {token && (
          <li>
            <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
