import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-column">
          <h3>Về chúng tôi</h3>
          <p>
            Hotel Management là hệ thống quản lý khách sạn hiện đại, giúp tối ưu hóa việc đặt phòng, dịch vụ và quản lý người dùng.
          </p>
          <p>
            Chúng tôi cam kết mang lại trải nghiệm tiện lợi và chuyên nghiệp cho khách hàng.
          </p>
        </div>

        {/* Cột 2: Liên hệ */}
        <div className="footer-column">
          <h3>Liên hệ</h3>
          <p>Email: support@hotel.com</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
        </div>

        {/* Cột 3: Liên kết nhanh */}
        <div className="footer-column">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="/rooms">Danh sách phòng</a></li>
            <li><a href="/bookings">Đặt phòng</a></li>
            <li><a href="/services">Dịch vụ bổ sung</a></li>
            <li><a href="/contact">Liên hệ hỗ trợ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Hotel Management. All rights reserved.</p>
      </div>
    </footer>
  );
}
