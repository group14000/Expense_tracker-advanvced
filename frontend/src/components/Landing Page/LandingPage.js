import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import LoginForm from "../Login/LoginForm";
import Signup from "../Sign Up/Signup";
import "./LandingPage.css";

function LandingPage() {
  return (
    <Router>
      <div className="text-center">
        {/* Beautiful Logo */}
        <img
          src="https://i.pinimg.com/1200x/86/1b/38/861b3844485fa9292a8110005dce5d4a.jpg"
          alt="Expense Tracker Logo"
        />

        {/* Login and Signup Options */}
        <div className="mt-3">
          <Link to="/login" className="btn btn-primary mx-2">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary mx-2">
            Signup
          </Link>
        </div>

        {/* Routing for Login and Signup Pages */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default LandingPage;
