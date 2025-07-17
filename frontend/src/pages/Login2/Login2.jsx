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

      console.log("accesstoken", accessToken);
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
    <div className="max-w-md mt-8 mx-auto p-6 bg-white rounded-lg shadow">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            {...register("email", { required: true })}
            className="w-full border px-3 py-2 rounded"
            type="email"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            {...register("password", { required: true })}
            className="w-full border px-3 py-2 rounded"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Login
          </button>
          <Link to="/signup">
            <div className="text-center mt-7">
              If you don't have account,{" "}
              <span className="text-blue-800 underline font-bold">Sign Up</span>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
