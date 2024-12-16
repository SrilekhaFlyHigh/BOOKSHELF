
import React, { useState } from "react";
import 'styles/signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const userData = { firstName, lastName, email, password, confirmPassword };

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      
      if (response.status === 201) {
        setMessage("User registered successfully");
      } else {
        setMessage(result.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="signupform">
      <h2 className="signuptext">Please fill the form </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="fn">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label className="fn">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="labeltext">Confirm Password</label>
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;


