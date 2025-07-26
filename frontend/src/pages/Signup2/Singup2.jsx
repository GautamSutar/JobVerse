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
    role: "",
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
        role: formData.role.toLowerCase(),
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
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6">Student Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>

        {/* Name Fields */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="first_name"
              className="w-full border px-3 py-2 rounded"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && (
              <p className="text-red-500">{errors.first_name}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="w-full border px-3 py-2 rounded"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Email & Gender */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="w-1/2 cursor-pointer">
            <label className="block mb-1 font-medium cursor-pointer">
              Gender
            </label>
            <select
              name="gender"
              className="w-full border px-3 cursor-pointer py-2 rounded"
              value={formData.gender}
              onChange={handleChange}
            >
              <option className="cursor-pointer" value="">
                Select Gender
              </option>
              <option className="cursor-pointer" value="Male">
                Male
              </option>
              <option className="cursor-pointer" value="Female">
                Female
              </option>
              <option className="cursor-pointer" value="Other">
                Other
              </option>
              <option className="cursor-pointer" value="Not prefer to say">
                Prefer not to say
              </option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            className="w-full border px-3 py-2 rounded"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="HR">HR</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
          {errors.confirm_password && (
            <p className="text-red-500">{errors.confirm_password}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <p className="text-center text-red-500">{errors.submit}</p>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
          >
            Signup
          </button>
          <Link to="/login">
            <div className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <span className="text-blue-800 underline font-bold">Login</span>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
