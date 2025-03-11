import React, { useState } from "react";
import { auth, googleProvider } from "./../../Firebase/firebase"; // Adjust path if needed
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        id_token: idToken,
      });

      navigate("/");
    } catch (error) {
      console.log("Login error ", error);
      console.error("Login failed:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        id_token: idToken,
      });

      navigate("/");
    } catch (error) {
      console.error("Google Login failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#E0A877] p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Login to Your Account
        </h2>

        <form className="mt-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74]"
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D74]"
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full text-white bg-[#002D74] rounded-full py-2 px-6 font-semibold transition-transform duration-300 hover:scale-105 hover:bg-[#001F4D] shadow-md"
          >
            Login
          </button>
        </form>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 text-white bg-red-600 rounded-full py-2 px-6 font-semibold transition-transform duration-300 hover:scale-105 hover:bg-red-700 shadow-md"
        >
          Sign in with Google
        </button>

        <p className="text-center mt-4 text-gray-800">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#002D74] font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
