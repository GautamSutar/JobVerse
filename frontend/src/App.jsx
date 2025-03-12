// src/App.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const location = useLocation();

  // Hide navbar for specific routes
  const hideNavbar = ["/signup", "/login"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;
