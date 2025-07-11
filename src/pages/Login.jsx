import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const { loginUser, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data, (userRole) => {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-primary-50">
      <Card title="Login" className="w-full sm:w-20rem md:w-25rem shadow-3">
        <form onSubmit={handleSubmit(onSubmit)} className="formgrid grid">
        
          <div className="field col-12">
            <span className="p-float-label w-full mt-3">
              <InputText
                id="email"
                {...register("email", { required: "Email is required" })}
                className={errors.email ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="email">Email</label>
            </span>
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>

          <div className="field col-12" style={{ position: "relative" }}>
            <span className="p-float-label w-full mt-3">
              <InputText
                id="password"
                type={passwordVisible ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={errors.password ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="password">Password</label>
            </span>

            <i
              className={`pi ${passwordVisible ? "pi-eye-slash" : "pi-eye"}`}
              style={{
                position: "absolute",
                right: "1.2rem",
                top: "60%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6b7280",
                fontSize: "1rem",
              }}
              onClick={() => setPasswordVisible((prev) => !prev)}
            ></i>

            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          <div className="field col-12 mt-3">
            <Button
              type="submit"
              label={loading ? "Logging in..." : "Login"}
              className="w-full"
              disabled={loading}
            />
          </div>

          {error && <small className="p-error block mt-2">{error}</small>}
        </form>
      </Card>
    </div>
  );
};

export default Login;
