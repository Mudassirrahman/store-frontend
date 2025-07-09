import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const { registerUser, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control, // 👈 Added for Controller
  } = useForm();

  const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const onSubmit = (data) => {
    registerUser(data, () => navigate("/login"));

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Register" className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4 gap-y-6">

          {/* Name */}
          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <InputText
              id="name"
              {...register("name", { required: "Name is required" })}
              className={errors.name ? "p-invalid" : ""}
            />
            <label htmlFor="name">Name</label>
          </span>
          {errors.name && <small className="p-error">{errors.name.message}</small>}

          {/* Email */}
          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <InputText
              id="email"
              {...register("email", { required: "Email is required" })}
              className={errors.email ? "p-invalid" : ""}
            />
            <label htmlFor="email">Email</label>
          </span>
          {errors.email && <small className="p-error">{errors.email.message}</small>}

          {/* Password with Controller Fix */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
                <Password
                  id="password"
                  toggleMask
                  feedback={false}
                  {...field}
                  className={errors.password ? "p-invalid" : ""}
                />
                <label htmlFor="password">Password</label>
              </span>
            )}
          />
          {errors.password && <small className="p-error">{errors.password.message}</small>}

          {/* Role Dropdown */}
          <span className="p-float-label w-full" style={{ marginBottom: "1.5rem" }}>
            <Dropdown
              id="role"
              options={roleOptions}
              value={watch("role")}
              onChange={(e) => setValue("role", e.value)}
              placeholder="Select Role"
              className={errors.role ? "p-invalid" : ""}
            />
            <label htmlFor="role">Role</label>
          </span>
          {errors.role && <small className="p-error">Role is required</small>}

          {/* Submit Button */}
          <Button
            type="submit"
            label={loading ? "Registering..." : "Register"}
            className="w-full mt-4"
            disabled={loading}
          />

          {/* Error Message */}
          {error && <small className="p-error">{error}</small>}
        </form>
      </Card>
    </div>
  );
};

export default Register;

