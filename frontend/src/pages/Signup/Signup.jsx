import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../Firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2"; // Import SweetAlert2
import { GoogleLogin } from '@react-oauth/google';
const Signup = () => {
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await axios.post("http://127.0.0.1:8000/api/auth/signup/", {
        name: result.user.displayName || "",
        email: result.user.email,
        id_token: idToken,
      });
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Google Signup successful! Redirecting to login...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      const errorMessage =
        "Google Signup failed. " + (err.response?.data?.error || err.message);
      setError(errorMessage);
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        confirmButtonColor: "#002D74",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-[#E0A877] p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create an Account
        </h2>
        {/* Removed the inline error display since we're using SweetAlert2 */}
        
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