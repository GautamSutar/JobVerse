  import React, { useState } from "react";
  import axios from "axios";
  import { useNavigate, Link } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import {
    FiUser,
    FiMail,
    FiLock,
    FiUsers,
    FiBriefcase,
    FiLogIn,
  } from "react-icons/fi";

  // A reusable InputField component to keep the form code clean
  const InputField = ({
    icon,
    name,
    type,
    placeholder,
    value,
    onChange,
    error,
  }) => {
    const Icon = icon;
    return (
      <div>
        <div className="relative">
          <Icon className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type={type}
            name={name}
            className={`w-full border rounded-lg px-12 py-3 bg-gray-50 focus:outline-none focus:ring-2 transition-colors ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-200 focus:ring-indigo-400"
            }`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
      </div>
    );
  };

  // A reusable SelectField component
  const SelectField = ({ icon, name, value, onChange, error, children }) => {
    const Icon = icon;
    return (
      <div>
        <div className="relative">
          <Icon className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <select
            name={name}
            className={`w-full border rounded-lg px-12 py-3 bg-gray-50 focus:outline-none focus:ring-2 appearance-none transition-colors ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-200 focus:ring-indigo-400"
            }`}
            value={value}
            onChange={onChange}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
      </div>
    );
  };

  export default function StudentSignupForm() {
    const navigate = useNavigate();

    // --- ALL YOUR EXISTING LOGIC IS PRESERVED ---
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
      "http://127.0.0.1:8000/api";

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
        const payload = { ...formData, role: formData.role.toLowerCase() };
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

    // --- NEW, ENHANCED UI ---
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ToastContainer />
        <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Side - Branding */}
          <div className="w-full md:w-1/2 p-8 md:p-12 text-white bg-indigo-600 flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-extrabold mb-4">Welcome to Job Verse</h1>
            <p className="text-lg text-indigo-200">
              Create an account to start your journey towards landing your dream
              job. Practice with AI, get feedback, and apply with confidence.
            </p>
            <video
              className="w-32 mx-auto rounded-full"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/assets/images/Logo/logo2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-500 mb-8">Let's get you started!</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                icon={FiUser}
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <InputField
                  icon={FiUser}
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={errors.first_name}
                />
                <InputField
                  icon={FiUser}
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  error={errors.last_name}
                />
              </div>

              <InputField
                icon={FiMail}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <SelectField
                  icon={FiUsers}
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  error={errors.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Not prefer to say">Prefer not to say</option>
                </SelectField>

                <SelectField
                  icon={FiBriefcase}
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  error={errors.role}
                >
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="HR">HR</option>
                </SelectField>
              </div>

              <InputField
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <InputField
                icon={FiLock}
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password}
              />

              {errors.submit && (
                <p className="text-center text-red-500">{errors.submit}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FiLogIn />
                  Create Account
                </button>
                <p className="text-center mt-4 text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
