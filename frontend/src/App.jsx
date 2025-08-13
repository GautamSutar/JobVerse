// src/App.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
function App() {
  const location = useLocation();

  // Hide navbar for specific routes
  const hideNavbarAndFooter = ["/signup", "/login"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarAndFooter && <Navbar />}
      <main className="flex-group">
        <Outlet />
      </main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
