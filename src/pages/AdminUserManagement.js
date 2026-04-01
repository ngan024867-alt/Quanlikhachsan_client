import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      alert("Bạn không có quyền truy cập!");
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [token, role, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLockToggle = async (id) => {
    try {
      await api.put(`/users/${id}/lock`);
      alert("Cập nhật trạng thái tài khoản thành công!");
      fetchUsers();
    } catch (err) {
      alert("Lỗi cập nhật trạng thái!");
    }
  };

  const handlePasswordUpdate = async (id) => {
    if (!newPassword) {
      alert("Vui lòng nhập mật khẩu mới!");
      return;
    }
    try {
      await api.put(`/users/${id}/password`, { newPassword });
      alert("Mật khẩu đã được cập nhật!");
      setNewPassword("");
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert("Lỗi cập nhật mật khẩu!");
    }
  };

  const handleNotify = async (id) => {
    if (!notification) {
      alert("Vui lòng nhập nội dung thông báo!");
      return;
    }
    try {
      await api.post(`/users/${id}/notify`, { message: notification });
      alert("Thông báo đã được gửi!");
      setNotification("");
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert("Lỗi gửi thông báo!");
    }
  };

  return (
    <div className="App-header">
      <h2>Quản lý tài khoản người dùng</h2>

      <div className="table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Tên đăng nhập</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.locked ? "Đã khóa" : "Hoạt động"}</td>
                <td>
                  <button
                    className="logout-btn"
                    onClick={() => handleLockToggle(user._id)}
                  >
                    {user.locked ? "Mở khóa" : "Khóa"}
                  </button>
                  <button
                    className="logout-btn"
                    style={{ marginLeft: "10px" }}
                    onClick={() => setSelectedUser(user)}
                  >
                    Quản lý
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div className="table-container" style={{ maxWidth: "600px", width: "100%" }}>
            <h3 style={{ textAlign: "center" }}>Quản lý: {selectedUser.username}</h3>

            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <h4>Cập nhật mật khẩu</h4>
              <input
                className="login-input"
                placeholder="Mật khẩu mới"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button
                className="logout-btn"
                style={{ marginLeft: "10px" }}
                onClick={() => handlePasswordUpdate(selectedUser._id)}
              >
                Đặt lại mật khẩu
              </button>
            </div>

            <div style={{ textAlign: "center" }}>
              <h4>Gửi thông báo</h4>
              <input
                className="login-input"
                placeholder="Nội dung thông báo"
                value={notification}
                onChange={e => setNotification(e.target.value)}
              />
              <button
                className="logout-btn"
                style={{ marginLeft: "10px" }}
                onClick={() => handleNotify(selectedUser._id)}
              >
                Gửi thông báo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

