import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import RoomsManagement from "./pages/RoomsManagement";
import BookingsManagement from "./pages/BookingsManagement";
import AdminUserManagement from "./pages/AdminUserManagement";
import UserNotifications from "./pages/UserNotifications";
import ServiceOrder from "./pages/ServiceOrder";
import AdminServiceManagement from "./pages/AdminServiceManagement";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<RoomsManagement />} />
        <Route path="/admin/bookings" element={<BookingsManagement />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/notifications" element={<UserNotifications />} />
        <Route path="/admin/services" element={<AdminServiceManagement />} />
        <Route path="/services" element={<ServiceOrder />} />
        
      </Routes>
      {/* Footer chung */}
        <Footer />
    </BrowserRouter>
  );
}

export default App;
