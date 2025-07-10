import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./Header.css";
import { useCartStore } from "../store/cartStore";
import { Badge } from "primereact/badge";

const Header = () => {
  const navigate = useNavigate();
  const { user, role, logoutUser } = useAuthStore();
  const { cartItems, resetCart  } = useCartStore();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logoutUser();
    resetCart();
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

  // ✅ Cart button render for all users

  const end = (
    <div className="relative">
      <Button
        icon="pi pi-shopping-cart"
        className="p-button-text p-button-rounded p-button-secondary ml-3"
        onClick={() => navigate("/cart")}
        tooltip="View Cart"
        tooltipOptions={{ position: "bottom" }}
      />
      {cartItems.length > 0 && (
        <Badge
          value={cartItems.length}
          className="absolute"
          style={{
            top: "-8px",
            right: "-8px",
            backgroundColor: "#f44336",
            color: "#fff",
          }}
        />
      )}
    </div>
  );

  return (
    <div className="flex justify-content-between align-items-center px-3 py-2 surface-100 shadow-2">
      <div className="font-bold text-lg pr-6 white-space-nowrap" onClick={() => navigate("/")}>
        🛒 Store App
      </div>

      <div className="md:w-auto flex align-items-center">
        <Menubar
          model={items}
          className="md:w-auto custom-menubar"
          end={end} // ✅ Add cart button at the end
        />
      </div>
    </div>
  );
};

export default Header;
