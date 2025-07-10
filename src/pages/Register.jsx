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

          {/* Name */}
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
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <span className="p-float-label w-full mt-3">
                  <Password
                    id="password"
                    toggleMask
                    feedback={false}
                    {...field}
                    className={errors.password ? "p-invalid w-full" : "w-full"}
                  />
                  <label htmlFor="password">Password</label>
                </span>
              )}
            />
            {errors.password && <small className="p-error">{errors.password.message}</small>}
          </div>

          {/* Role */}
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

          {/* Submit */}
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
