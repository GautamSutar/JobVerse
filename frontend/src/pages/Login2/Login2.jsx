import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const API_URL =
    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL ||
    "http://127.0.0.1:8000/api/auth";

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, data);

      const { accessToken, role } = response.data;

      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("userRole", role);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false,
        theme: "colored",
      });

      setTimeout(() => {
        if (role === "student") {
          navigate("/student-dashboard");
        } else if (role === "hr") {
          navigate("/hr-dashboard");
        }
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail || "Login failed. Please try again.";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false,
        theme: "colored",
      });
      console.error("Login failed:", errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <ToastContainer />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          👋 Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">Password is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-md"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 font-semibold underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
