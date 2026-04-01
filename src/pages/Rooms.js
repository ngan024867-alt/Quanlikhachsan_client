import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [services, setServices] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      alert("Bạn cần đăng nhập để xem danh sách phòng!");
      navigate("/login");
    } else {
      fetchRooms();
    }
  }, [token, navigate]);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBooking = async () => {
    if (!checkin || !checkout) {
      alert("Vui lòng chọn ngày check-in và check-out!");
      return;
    }
    try {
      await api.post("/bookings", {
        room: selectedRoom._id,
        checkin,
        checkout,
        services
      });
      alert("Đặt phòng thành công!");
      setSelectedRoom(null);
      setCheckin("");
      setCheckout("");
      setServices("");
      fetchRooms();
    } catch (err) {
      alert("Lỗi đặt phòng!");
    }
  };

  return (
    <div className="App-header">
      <h2>Danh sách phòng</h2>

      {rooms.length === 0 ? (
        <p>Không có phòng nào.</p>
      ) : (
        <div className="table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Số phòng</th>
                <th>Loại</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room._id}>
                  <td>{room.number}</td>
                  <td>{room.type}</td>
                  <td>{room.price}</td>
                  <td>{room.status}</td>
                  <td>
                    {room.status === "available" && (
                      <button
                        className="logout-btn"
                        onClick={() => setSelectedRoom(room)}
                      >
                        Đặt phòng
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form chỉ hiện khi chọn phòng */}
      {selectedRoom && (
        <div className="table-container" style={{ marginTop: "20px" }}>
          <h3>Đặt phòng: {selectedRoom.number}</h3>
          <table className="booking-table">
            <tbody>
              <tr>
                <td>Check-in</td>
                <td>
                  <input
                    type="date"
                    className="login-input"
                    value={checkin}
                    onChange={e => setCheckin(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Check-out</td>
                <td>
                  <input
                    type="date"
                    className="login-input"
                    value={checkout}
                    onChange={e => setCheckout(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Dịch vụ</td>
                <td>
                  <input
                    className="login-input"
                    placeholder="vd: ăn uống, thay drap"
                    value={services}
                    onChange={e => setServices(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button className="logout-btn" onClick={handleBooking}>Xác nhận đặt phòng</button>
                  <button className="logout-btn" style={{ marginLeft: "10px" }} onClick={() => setSelectedRoom(null)}>Hủy</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
