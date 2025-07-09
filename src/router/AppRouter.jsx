// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import AllProducts from "../pages/AllProducts";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AllProducts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
