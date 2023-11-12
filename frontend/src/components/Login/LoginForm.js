import React from 'react';
import "./LoginForm.css";
import Firebase from "../../Firebase"; // Import Firebase component
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function LoginForm() {
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Successfully logged in as ${user.displayName || user.email}`);
      
      // Additional logic to send login credentials to Firebase if needed
      // For example, you can save user data to Firestore or Realtime Database
    } catch (error) {
      console.error(error.message);
      alert('Failed to log in. Please try again.');
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <div className="mt-3">
        <p>Or login with:</p>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-danger" onClick={handleGoogleLogin}>
            <i className="bi bi-google"></i> Google
          </button>
          <button type="button" className="btn btn-outline-dark">
            <i className="bi bi-github"></i> GitHub
          </button>
          <button type="button" className="btn btn-outline-primary">
            <i className="bi bi-facebook"></i> Facebook
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
