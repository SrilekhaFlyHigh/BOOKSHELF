
import React, { useState } from "react";
import 'styles/signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");  // For showing success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
  
    const userData = { firstName, lastName, email, password, confirmPassword };
  
    try {
      // Send signup request to the backend
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      // Parse the response
      const result = await response.json();
  
      // Check if the response status is 201 (Created)
      if (response.status === 201) {
        setMessage(result.message);  // Set success message from backend
        // Clear form fields after successful signup
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(result.error || "Something went wrong");  // Error handling
      }
    } catch (error) {
      // Handle network or server error
      setMessage("Error: " + error.message);
    }
  };
  
  return (
    <div className="login-backgroundimage">
    <div className="signup-container signup-form">
      <h2 className="signuptext">Please fill the form to register..</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="signup-label">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="signup-label">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signup-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signup-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signup-label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="signupbtn" type="submit">Signup</button>
      </form>

      {/* Displaying success or error message */}
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
};

export default Signup;
