import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Booking() {
  const [roomId, setRoomId] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [services, setServices] = useState("");
  const [rooms, setRooms] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "user") {
      alert("Bạn cần đăng nhập bằng tài khoản user để đặt phòng!");
      navigate("/login");
    } else {
      fetchRooms();
      fetchMyBookings();
    }
  }, [token, role, navigate]);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      const availableRooms = res.data.filter(r => r.status === "available");
      setRooms(availableRooms);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setMyBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBooking = async () => {
    if (!roomId || !checkin || !checkout) {
      alert("Vui lòng chọn phòng và nhập ngày!");
      return;
    }
    try {
      await api.post("/bookings", {
        room: roomId,
        checkin,
        checkout,
        services: services ? services.split(",") : []
      });
      alert("Đặt phòng thành công!");
      setRoomId("");
      setCheckin("");
      setCheckout("");
      setServices("");
      fetchRooms();
      fetchMyBookings();
    } catch (err) {
      alert("Lỗi đặt phòng!");
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm("Bạn có chắc muốn hủy đặt phòng này?")) {
      try {
        await api.delete(`/bookings/${id}`);
        alert("Hủy đặt phòng thành công!");
        fetchRooms();
        fetchMyBookings();
    } catch (err) {
      alert("Lỗi hủy đặt phòng!");
    }
  };
  }

  return (
    <div className="App-header">
      <h2>Đặt phòng</h2>

      <div>
        <label>Chọn phòng trống: </label>
        <select value={roomId} onChange={e => setRoomId(e.target.value)} className="login-input">
          <option value="">-- Chọn phòng --</option>
          {rooms.map(room => (
            <option key={room._id} value={room._id}>
              Phòng {room.number} - {room.type} - Giá {room.price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Ngày nhận phòng: </label>
        <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} className="login-input" />
      </div>

      <div>
        <label>Ngày trả phòng: </label>
        <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} className="login-input" />
      </div>

      <div>
        <label>Dịch vụ (vd: ăn uống, thay drap): </label>
        <input value={services} onChange={e => setServices(e.target.value)} className="login-input" />
      </div>

      <button className="logout-btn" onClick={handleBooking} style={{ marginTop: "10px" }}>
        Đặt phòng
      </button>

      <h2 style={{ marginTop: "30px" }}>Lịch sử đặt phòng của tôi</h2>
      {myBookings.length === 0 ? (
        <p>Bạn chưa có lịch sử đặt phòng nào.</p>
      ) : (
        <div className="table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Phòng</th>
                <th>Ngày nhận</th>
                <th>Ngày trả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map(b => (
                <tr key={b._id}>
                  <td>{b.room?.number}</td>
                  <td>{new Date(b.checkin).toLocaleDateString("vi-VN")}</td>
                  <td>{new Date(b.checkout).toLocaleDateString("vi-VN")}</td>
                  <td>
                    {b.status === "booked" ? "Đang ở" : b.status === "checkedout" ? "Đã trả" : "Đã hủy"}
                  </td>
                  <td>
                    {b.status === "booked" && (
                      <button
                        className="logout-btn"
                        onClick={() => handleCancelBooking(b._id)}
                      >
                        Hủy
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

