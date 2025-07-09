import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const { loginUser, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const [passwordValue, setPasswordValue] = useState(""); // controlled state

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data, (userRole) => {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // ya "/user/dashboard" agar aap banaen
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Login" className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4 gap-y-6">
          {/* Email */}
          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <InputText
              id="email"
              {...register("email", { required: "Email is required" })}
              className={errors.email ? "p-invalid" : ""}
            />
            <label htmlFor="email">Email</label>
          </span>
          {errors.email && (
            <small className="p-error">{errors.email.message}</small>
          )}

          {/* Password (Controlled) */}
          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <Password
              id="password"
              toggleMask
              feedback={false}
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
                setValue("password", e.target.value, {
                  shouldValidate: true,
                });
              }}
              className={errors.password ? "p-invalid" : ""}
            />
            <label htmlFor="password">Password</label>
          </span>
          {errors.password && (
            <small className="p-error">{errors.password.message}</small>
          )}

          {/* Submit */}
          <Button
            type="submit"
            label={loading ? "Logging in..." : "Login"}
            className="w-full mt-4"
            disabled={loading}
          />

          {error && <small className="p-error">{error}</small>}
        </form>
      </Card>
    </div>
  );
};

export default Login;
