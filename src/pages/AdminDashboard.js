import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function AdminDashboard() {
  return (
    <div className="App-header">
      <h1>Trang quản trị Admin</h1>
      <p>Chọn chức năng quản lý:</p>
      <div className="admin-dashboard-buttons">
        <Link to="/admin/rooms" className="admin-btn">
          Quản lý phòng
        </Link>
        <Link to="/admin/bookings" className="admin-btn">
          Quản lý booking
        </Link>
        <Link to="/admin/users" className="admin-btn">
          Quản lý người dùng
        </Link>
        <Link to="/admin/services" className="admin-btn">
          Quản lý dịch vụ bổ sung
        </Link>
      </div>
    </div>
  );
}
