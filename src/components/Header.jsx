import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, role, logoutUser } = useAuthStore();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
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
  ].filter(Boolean);

  return (
    <div className="flex justify-content-between align-items-center px-3 py-2 surface-100 shadow-2">
      <div className="font-bold text-lg pr-6 white-space-nowrap">🛒 Store App</div>

      <div className="md:w-auto">
        <Menubar
          model={items}
          className="md:w-auto custom-menubar"
        />
      </div>
    </div>
  );
};

export default Header;
