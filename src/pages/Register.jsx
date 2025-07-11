import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const { registerUser, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm();

  const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const onSubmit = (data) => {
    registerUser(data, () => navigate("/login"));
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-primary-50">
      <Card title="Register" className="w-full sm:w-20rem md:w-25rem shadow-3">
        <form onSubmit={handleSubmit(onSubmit)} className="formgrid grid">

          <div className="field col-12">
            <span className="p-float-label w-full mt-3">
              <InputText
                id="name"
                {...register("name", { required: "Name is required" })}
                className={errors.name ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="name">Name</label>
            </span>
            {errors.name && <small className="p-error">{errors.name.message}</small>}
          </div>

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

          <div className="field col-12" style={{ position: "relative" }}>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <span className="p-float-label w-full mt-3">
                  <InputText
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    {...field}
                    className={errors.password ? "p-invalid w-full" : "w-full"}
                  />
                  <label htmlFor="password">Password</label>

                  <i
                    className={`pi ${passwordVisible ? "pi-eye-slash" : "pi-eye"}`}
                    style={{
                      position: "absolute",
                      right: "1.2rem",
                      top: "58%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#6b7280",
                      fontSize: "1rem",
                    }}
                    onClick={() => setPasswordVisible((prev) => !prev)}
                  ></i>
                </span>
              )}
            />
            {errors.password && <small className="p-error">{errors.password.message}</small>}
          </div>

          <div className="field col-12">
            <span className="p-float-label w-full mt-3">
              <Dropdown
                id="role"
                options={roleOptions}
                value={watch("role")}
                onChange={(e) => setValue("role", e.value)}
                placeholder="Select Role"
                className={errors.role ? "p-invalid w-full" : "w-full"}
              />
              <label htmlFor="role">Role</label>
            </span>
            {errors.role && <small className="p-error">Role is required</small>}
          </div>

          <div className="field col-12 mt-2">
            <Button
              type="submit"
              label={loading ? "Registering..." : "Register"}
              className="w-full"
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && <small className="p-error block mt-2">{error}</small>}
        </form>
      </Card>
    </div>
  );
};

export default Register;
