// src/components/Header.jsx
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // ✅ Zustand store

const Header = () => {
  const navigate = useNavigate();

  const { user, role, logoutUser } = useAuthStore(); // ✅ Zustand values
  const isLoggedIn = !!user; // ✅ user agar exist kare to logged in

  const handleLogout = () => {
    logoutUser(); // ✅ Zustand logout call
    navigate("/login"); // ✅ Redirect after logout
  };

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    !isLoggedIn && {
      label: "Login",
      icon: "pi pi-sign-in",
      command: () => navigate("/login"),
    },
    !isLoggedIn && {
      label: "Register",
      icon: "pi pi-user-plus",
      command: () => navigate("/register"),
    },
    isLoggedIn &&
      role === "admin" && {
        label: "Admin Dashboard",
        icon: "pi pi-cog",
        command: () => navigate("/admin"),
      },
    isLoggedIn && {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: handleLogout,
    },
    isLoggedIn && {
      label: `Welcome, ${user}`,
      icon: "pi pi-user",
      className: "cursor-default",
      disabled: true,
    },
  ].filter(Boolean); // ✅ remove undefined or false entries

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        background: "#f8f9fa",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>🛒 Store App</div>
      <Menubar model={items} />
    </div>
  );
};

export default Header;
