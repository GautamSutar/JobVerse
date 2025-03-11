import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../../Firebase/firebase";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/signup/",
        formData
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
      console.error("Signup failed:", err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await axios.post("http://127.0.0.1:8000/api/auth/signup/", {
        name: result.user.displayName || "",
        email: result.user.email,
        id_token: idToken,
      });
      navigate("/login");
    } catch (err) {
      setError(
        "Google Signup failed. " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#E0A877] p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create an Account
        </h2>
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        <form className="mt-6" onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#002D74] rounded-full py-2 px-6 font-semibold transition-transform duration-300 hover:scale-105 hover:bg-[#001F4D] shadow-md"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={handleGoogleSignup}
          className="mt-4 w-full bg-white text-gray-900 rounded-full py-2 px-6 font-semibold border border-gray-300 transition-transform duration-300 hover:scale-105 hover:bg-gray-200 shadow-md"
        >
          Sign Up with Google
        </button>
        <p className="text-center mt-4 text-gray-800">
          Already have an account?{" "}
          <a href="/login" className="text-[#002D74] font-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
