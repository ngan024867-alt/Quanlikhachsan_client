import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../App.css";

export default function UserNotifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Lỗi lấy thông báo:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

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
