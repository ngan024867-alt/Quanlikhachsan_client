import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function RoomsManagement() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ number: "", type: "", price: "", status: "available" });
  const [editRoom, setEditRoom] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      alert("Bạn không có quyền truy cập!");
      navigate("/login");
    } else {
      fetchRooms();
    }
  }, [token, role, navigate]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRoom = async () => {
    try {
      await axios.post("http://localhost:5000/api/rooms", newRoom, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Thêm phòng thành công!");
      setNewRoom({ number: "", type: "", price: "", status: "available" });
      fetchRooms();
    } catch (err) {
      alert("Lỗi thêm phòng!");
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Xóa phòng thành công!");
        fetchRooms();
      } catch (err) {
        alert("Lỗi xóa phòng!");
      }
    }
  };

  const handleEditRoom = (room) => {
    setEditRoom(room);
  };

  const handleUpdateRoom = async () => {
    try {
      await axios.put(`http://localhost:5000/api/rooms/${editRoom._id}`, editRoom, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Cập nhật phòng thành công!");
      setEditRoom(null);
      fetchRooms();
    } catch (err) {
      alert("Lỗi cập nhật phòng!");
    }
  };

  return (
    <div className="App-header">
      <h2>Quản lý phòng</h2>

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
                {editRoom && editRoom._id === room._id ? (
                  <>
                    <td>
                      <input
                        className="login-input"
                        value={editRoom.number}
                        onChange={e => setEditRoom({ ...editRoom, number: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="login-input"
                        value={editRoom.type}
                        onChange={e => setEditRoom({ ...editRoom, type: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="login-input"
                        type="number"
                        value={editRoom.price}
                        onChange={e => setEditRoom({ ...editRoom, price: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        className="login-input"
                        value={editRoom.status}
                        onChange={e => setEditRoom({ ...editRoom, status: e.target.value })}
                      >
                        <option value="available">available</option>
                        <option value="booked">booked</option>
                      </select>
                    </td>
                    <td>
                      <button className="logout-btn" onClick={handleUpdateRoom}>Lưu</button>
                      <button className="logout-btn" style={{ marginLeft: "10px" }} onClick={() => setEditRoom(null)}>Hủy</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{room.number}</td>
                    <td>{room.type}</td>
                    <td>{room.price}</td>
                    <td>{room.status}</td>
                    <td>
                      <button className="logout-btn" onClick={() => handleEditRoom(room)}>Sửa</button>
                      <button className="logout-btn" style={{ marginLeft: "10px" }} onClick={() => handleDeleteRoom(room._id)}>Xóa</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Thêm phòng mới</h3>
      <input className="login-input" placeholder="Số phòng" value={newRoom.number} onChange={e => setNewRoom({ ...newRoom, number: e.target.value })} />
      <input className="login-input" placeholder="Loại phòng" value={newRoom.type} onChange={e => setNewRoom({ ...newRoom, type: e.target.value })} />
      <input className="login-input" placeholder="Giá phòng" type="number" value={newRoom.price} onChange={e => setNewRoom({ ...newRoom, price: e.target.value })} />
      <select className="login-input" value={newRoom.status} onChange={e => setNewRoom({ ...newRoom, status: e.target.value })}>
        <option value="available">available</option>
        <option value="booked">booked</option>
      </select>
      <button className="logout-btn" onClick={handleAddRoom}>Thêm phòng</button>
    </div>
  );
}
