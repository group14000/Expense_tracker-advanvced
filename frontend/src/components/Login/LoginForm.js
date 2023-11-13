// Import necessary modules from React and Firebase
import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../../Firebase"; // Assuming Firebase is properly initialized

// Define the LoginForm component
function LoginForm() {
  // Initialize state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Use the useNavigate hook from react-router-dom for programmatic navigation
  const navigate = useNavigate();

  // Event handler for email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    // Check if the entered email and password match the stored user data
    if (
      userData &&
      userData.email === email &&
      userData.password === password
    ) {
      // Successful login
      alert("Successfully logged in");

      // Redirect to ExpenseTrackerForm after successful login
      navigate("/expense-tracker-form");
    } else {
      // Failed to log in
      alert("Failed to log in. Please check your credentials and try again.");
    }
  };

  // Event handler for Google login
  const handleGoogleLogin = async () => {
    // Initialize Firebase authentication and Google provider
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, provider);

      // Get user information from the result
      const user = result.user;

      // Alert user about successful Google login
      alert(`Successfully logged in as ${user.displayName || user.email}`);

      // Additional logic to send login credentials to Firebase if needed
      // For example, you can save user data to Firestore or Realtime Database
      // ...

      // Redirect to ExpenseTrackerForm after successful Google login
      navigate("/expense-tracker-form");
    } catch (error) {
      // Log and alert about the error if Google login fails
      console.error(error.message);
      alert("Failed to log in. Please try again.");
    }
  };

  // JSX structure for the login form
  return (
    <form onSubmit={handleSubmit}>
      {/* Email input */}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleEmailChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      {/* Password input */}
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={handlePasswordChange}
        />
      </div>

      {/* Checkbox */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      {/* Additional login options */}
      <div className="mt-3">
        <p>Or login with:</p>
        <div className="d-flex justify-content-between">
          {/* Google login button */}
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleGoogleLogin}
          >
            <i className="bi bi-google"></i> Google
          </button>

          {/* GitHub login button */}
          <button type="button" className="btn btn-outline-dark">
            <i className="bi bi-github"></i> GitHub
          </button>

          {/* Facebook login button */}
          <button type="button" className="btn btn-outline-primary">
            <i className="bi bi-facebook"></i> Facebook
          </button>
        </div>
      </div>
    </form>
  );
}

// Export the LoginForm component as the default export
export default LoginForm;
