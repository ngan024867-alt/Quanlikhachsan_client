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
           <li>
              <Link to="/login" onClick={() => setIsOpen(false)}>Đăng nhập</Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setIsOpen(false)}>Đăng ký</Link>
            </li>
            <li>
              <Link to="/forgot" onClick={() => setIsOpen(false)}>Quên mật khẩu</Link>
            </li>

          </>
        )}

        {token && role === "user" && (
          <>
            <li><Link to="/rooms" onClick={() => setIsOpen(false)}>Danh sách phòng</Link></li>
            <li><Link to="/booking" onClick={() => setIsOpen(false)}>Đặt phòng</Link></li>
            <li><Link to="/notifications" onClick={() => setIsOpen(false)}>Thông báo</Link></li>
            <li><Link to="/services" onClick={() => setIsOpen(false)}>Dịch vụ bổ sung</Link></li>
          </>
        )}

        {token && role === "admin" && (
          <>
            <li><Link to="/admin" onClick={() => setIsOpen(false)}>Trang quản trị</Link></li>
            <li><Link to="/admin/rooms" onClick={() => setIsOpen(false)}>Quản lý phòng</Link></li>
            <li><Link to="/admin/bookings" onClick={() => setIsOpen(false)}>Quản lý đặt phòng</Link></li>
            <li><Link to="/admin/users" onClick={() => setIsOpen(false)}>Quản lý người dùng</Link></li>
            <li><Link to="/admin/services" onClick={() => setIsOpen(false)}>Quản lý dịch vụ bổ sung</Link></li>
          </>
        )}

        {token && (
          <li>
          <button
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="logout-btn"
          >
            Đăng xuất
          </button>
        </li>

        )}
      </ul>
    </nav>
  );
}
