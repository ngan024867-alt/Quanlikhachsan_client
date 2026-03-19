import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      alert("Bạn không có quyền truy cập!");
      navigate("/login");
    } else {
      fetchBookings();
    }
  }, [token, role, navigate]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckin = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/bookings/checkin/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Xác nhận ngày nhận phòng thực tế thành công!");
      fetchBookings();
    } catch (err) {
      alert("Lỗi xác nhận ngày nhận phòng!");
    }
  };

  const handleCheckout = async (id, roomId) => {
    try {
      await axios.post(`http://localhost:5000/api/bookings/checkout/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Checkout thành công và phòng đã được cập nhật trạng thái!");
      fetchBookings();
    } catch (err) {
      alert("Lỗi checkout!");
    }
  };

  // Lọc và tìm kiếm theo trạng thái
  const filteredBookings = bookings.filter(booking => {
    const matchSearch = booking.user?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    let matchStatus = true;

    if (filterStatus === "active") {
      matchStatus = booking.status === "booked";
    } else if (filterStatus === "checkedout") {
      matchStatus = booking.status === "checkedout";
    } else if (filterStatus === "cancelled") {
      matchStatus = booking.status === "cancelled";
    }

    return matchSearch && matchStatus;
  });

  // Phân trang
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div className="App-header">
      <h2>Quản lý đặt phòng</h2>

      {/* Tìm kiếm và lọc */}
      <div style={{ marginBottom: "20px" }}>
        <input
          className="login-input"
          placeholder="Tìm theo tên người dùng..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="login-input"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="all">Tất cả</option>
          <option value="active">Đang ở</option>
          <option value="checkedout">Đã trả phòng</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Bảng hiển thị booking */}
      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Người dùng</th>
              <th>Phòng</th>
              <th>Ngày nhận dự kiến</th>
              <th>Ngày trả dự kiến</th>
              <th>Ngày nhận thực tế</th>
              <th>Trạng thái</th>
              <th>Số tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.user?.username}</td>
                <td>{booking.room?.number}</td>
                <td>{new Date(booking.checkin).toLocaleDateString("vi-VN")}</td>
                <td>{new Date(booking.checkout).toLocaleDateString("vi-VN")}</td>
                <td>
                  {booking.actualCheckinDate
                    ? new Date(booking.actualCheckinDate).toLocaleDateString("vi-VN")
                    : "Chưa xác nhận"}
                </td>
                <td>
                  {booking.status === "booked" ? "Đang ở" :
                   booking.status === "checkedout" ? "Đã trả phòng" : "Đã hủy"}
                </td>
                <td>{booking.totalAmount ? `${booking.totalAmount} VND` : ""}</td>
                <td>
                  {booking.status === "booked" && (
                    <>
                      <button
                        className="logout-btn"
                        onClick={() => handleCheckin(booking._id)}
                      >
                        Nhận phòng
                      </button>
                      <button
                        className="logout-btn"
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleCheckout(booking._id, booking.room?._id)}
                      >
                        Trả phòng
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className="logout-btn"
            style={{ marginRight: "5px", backgroundColor: currentPage === i + 1 ? "#1976d2" : "#d32f2f" }}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
