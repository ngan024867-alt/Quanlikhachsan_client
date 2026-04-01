import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../App.css";

export default function ServiceOrder() {
  const [services, setServices] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/services/my");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy dịch vụ:", err);
      setOrders([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentTime = new Date();

      await api.post("/services", {
        services,
        time: currentTime,
        roomNumber
      });

      alert("Đặt dịch vụ thành công!");
      setServices("");
      setRoomNumber("");
      fetchOrders();
    } catch (err) {
      alert("Lỗi đặt dịch vụ!");
    }
  };

  return (
    <div className="App-header">
      <h2>Đặt dịch vụ bổ sung</h2>
      <form onSubmit={handleSubmit} className="table-container">
        <div>
          <label>Dịch vụ: </label>
          <input
            value={services}
            onChange={e => setServices(e.target.value)}
            className="login-input"
          />
        </div>
        <div>
          <label>Số phòng: </label>
          <input
            value={roomNumber}
            onChange={e => setRoomNumber(e.target.value)}
            className="login-input"
          />
        </div>
        <button type="submit" className="logout-btn">Gửi yêu cầu</button>
      </form>

      <h3 style={{ marginTop: "20px" }}>Lịch sử dịch vụ của bạn</h3>
      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Thời gian</th>
              <th>Số phòng</th>
              <th>Tên người dùng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order.services}</td>
                  <td>{new Date(order.time).toLocaleString("vi-VN")}</td>
                  <td>{order.roomNumber}</td>
                  <td>{order.username}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Chưa có dịch vụ nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

