import React, { useState } from 'react';
import "./Signup.css";

function Signup() {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfilePhotoChange = (e) => {
    // Handle profile photo upload logic here
    setProfilePhoto(e.target.files[0]);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add validation logic for password confirmation
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Handle form submission logic here

    // For example, you can send the data to a server or perform further actions
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="profilePhoto" className="form-label">
          Profile Photo
        </label>
        <input
          type="file"
          className="form-control"
          id="profilePhoto"
          onChange={handleProfilePhotoChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dob" className="form-label">
          Date of Birth
        </label>
        <input
          type="date"
          className="form-control"
          id="dob"
          value={dob}
          onChange={handleDobChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Signup;
