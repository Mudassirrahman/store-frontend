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

  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
          {/* Email */}
          <div className="field col-12">
            <span className="p-float-label w-full mt-3">
              <InputText
                id="email"
                {...register("email", { required: "Email is required" })}
                className={errors.email ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="email">Email</label>
            </span>
            {errors.email && <small className="p-error">{errors.email.message}</small>}
          </div>

          {/* Password */}
          <div className="field col-12">
            <span className="p-float-label w-full mt-3">
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
                className={errors.password ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="password">Password</label>
            </span>
            {errors.password && <small className="p-error">{errors.password.message}</small>}
          </div>

          {/* Submit */}
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
