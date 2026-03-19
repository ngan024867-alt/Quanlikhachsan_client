import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AdminServiceManagement() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

useEffect(() => {
  if (!token || role !== "admin") {
    alert("Bạn không có quyền truy cập!");
    navigate("/login");
  } else {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/services`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data || []);
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }
}, [token, role, navigate]);


  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/services/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Cập nhật trạng thái thành công!");
      fetchOrders();
    } catch (err) {
      alert("Lỗi cập nhật trạng thái!");
    }
  };

  return (
    <div className="App-header">
      <h2>Quản lý dịch vụ bổ sung</h2>
      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Thời gian</th>
              <th>Số phòng</th>
              <th>Tên người dùng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
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
                  <td>
                    <button
                      className="logout-btn"
                      onClick={() => handleUpdateStatus(order._id, "Đang xử lý")}
                    >
                      Đang xử lý
                    </button>
                    <button
                      className="logout-btn"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleUpdateStatus(order._id, "Hoàn thành")}
                    >
                      Hoàn thành
                    </button>
                    <button
                      className="logout-btn"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleUpdateStatus(order._id, "Hủy")}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Không có đơn dịch vụ nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
