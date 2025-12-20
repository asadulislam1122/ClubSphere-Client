import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SosialLogin from "./SosialLogin";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signInUser, forgotPassword } = useAuth();
  const email = watch("email");

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login Sucessfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.success("Please enter your email first");
      return;
    }

    forgotPassword(email)
      .then(() => {
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      <title>ClubSphere-Login-Page</title>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-center">
          <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
          <p className="text-sm text-blue-100 mt-1">Login to your account</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full mt-1"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                })}
                className="input input-bordered w-full mt-1"
                placeholder="••••••••"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-xs mt-1">
                  Minimum 6 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-xs mt-1">
                  Uppercase, lowercase & symbol required
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* sosial login */}
            <SosialLogin></SosialLogin>

            {/* Register */}
            <p className="text-center text-sm text-gray-600 mt-3">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
