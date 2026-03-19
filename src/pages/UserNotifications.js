import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function UserNotifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // giả sử API trả về user object có mảng notifications
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Lỗi lấy thông báo:", err);
    }
  };

  return (
    <div className="App-header">
      <h2>Thông báo của bạn</h2>

      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Nội dung</th>
              <th>Ngày gửi</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Không có thông báo nào
                </td>
              </tr>
            ) : (
              notifications.map((note, index) => (
                <tr key={index}>
                  <td>{note.message}</td>
                  <td>{new Date(note.date).toLocaleString("vi-VN")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
