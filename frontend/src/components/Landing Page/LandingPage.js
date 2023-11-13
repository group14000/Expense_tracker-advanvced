import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "../Login/LoginForm";
import Signup from "../Sign Up/Signup";
import ExpenseTrackerForm from "../ExpenseTracker/ExpenseTrackerForm"; // Import the ExpenseTrackerForm component
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

        {/* Routing for Login, Signup, and ExpenseTrackerForm Pages */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/expense-tracker-form"
            element={<ExpenseTrackerForm />}
          />
          {/* Add a default route to redirect to /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default LandingPage;
