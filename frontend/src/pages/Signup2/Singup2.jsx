import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentSignupForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    role: "", // changed from "student" to "" so user can select
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  const API_URL =
    import.meta.env.VITE_REACT_APP_BACKEND_BASEURL ||
    "http://127.0.0.1:8000/api/auth";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirm_password)
      newErrors.confirm_password = "Confirm password is required";
    else if (formData.confirm_password !== formData.password)
      newErrors.confirm_password = "Passwords must match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        role: formData.role.toLowerCase(), // 🔥 convert role to lowercase
      };

      const response = await axios.post(`${API_URL}/auth/signup/`, payload);

      if (response.status === 201) {
        toast.success("Signup successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Signup failed. Try again.";

      toast.error(backendMessage, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setErrors((prev) => ({ ...prev, submit: backendMessage }));
      console.error("Signup Error:", backendMessage);
    }
  };

  return (
    <div className="max-w-xl mt-8 mx-auto p-6 bg-white rounded-lg shadow">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-center mb-4">
        Student Signup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block mb-1">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="text"
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        {/* First + Last Name */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1">First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              type="text"
              placeholder="First Name"
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              type="text"
              placeholder="Last Name"
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Email + Gender */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Not prefer to say">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
        </div>

        {/* Role Field (NEW) */}
        <div>
          <label className="block mb-1">Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="HR">HR</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirm_password && (
            <p className="text-red-500">{errors.confirm_password}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <p className="text-red-500 text-center">{errors.submit}</p>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Signup
          </button>
          <Link to="/login">
            <div className="text-center mt-7">
              If you have already account,{" "}
              <span className="text-blue-800 underline font-bold">Login</span>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
