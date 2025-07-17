import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-52 mb-36 text-gray-700 ">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/student-dashboard"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
