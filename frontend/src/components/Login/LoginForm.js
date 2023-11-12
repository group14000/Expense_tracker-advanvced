import React from 'react';
import "./LoginForm.css";
function LoginForm() {
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

      {/* Social Login Options */}
      <div className="mt-3">
        <p>Or login with:</p>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-danger">
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
