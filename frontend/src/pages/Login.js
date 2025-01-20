// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "styles/login.css";

// const Login = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         localStorage.setItem("token", data.token);
//         onLoginSuccess(); // Trigger onLoginSuccess to update the login state       
//         setSuccessMessage("Login successful! Redirecting...");
       
//         setTimeout(() =>  navigate('/my-bookshelf'), 1500);
//       } else {
//         setErrorMessage(data.error || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setErrorMessage("Unable to connect to the server. Please try again later.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleLogin}>
//         <h2 className="login-title">Please enter registered details..</h2>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Login</button>

//         <p className="link">
//            Don't have an account? <a href="/signup">Sign Up</a>
//          </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "styles/login.css";

// // const Login = ({ onLoginSuccess }) => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setErrorMessage("");
// //     setSuccessMessage("");

// //     try {
// //       const response = await fetch("http://localhost:5000/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       // Check if response is HTML instead of JSON
// //       const text = await response.text();
// //       try {
// //         const data = JSON.parse(text); // Try parsing the text as JSON
// //         if (response.ok) {
// //           localStorage.setItem("token", data.token);
// //           onLoginSuccess(); // Trigger onLoginSuccess to update the login state       
// //           setSuccessMessage("Login successful! Redirecting...");
          
// //           setTimeout(() => navigate('/my-bookshelf'), 1500);
// //         } else {
// //           setErrorMessage(data.error || "Login failed. Please try again.");
// //         }
// //       } catch (err) {
// //         console.error("Error during login:", err);
// //         setErrorMessage("Unable to connect to the server. Please try again later.");
// //       }

// //     } catch (error) {
// //       console.error("Network or parsing error:", error);
// //       setErrorMessage("Unable to connect to the server. Please try again later.");
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <form className="login-form" onSubmit={handleLogin}>
// //         <h2 className="login-title">Please enter registered details..</h2>
// //         {errorMessage && <p className="error-message">{errorMessage}</p>}
// //         {successMessage && <p className="success-message">{successMessage}</p>}

// //         <div className="form-group">
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             placeholder="Enter your email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             placeholder="Enter your password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <button type="submit">Login</button>

// //         <p className="link">
// //            Don't have an account? <a href="/signup">Sign Up</a>
// //          </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/login.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if response is HTML instead of JSON
      const text = await response.text();
      try {
        const data = JSON.parse(text); // Try parsing the text as JSON
        if (response.ok) {
          localStorage.setItem("token", data.token);
          onLoginSuccess(); // Trigger onLoginSuccess to update the login state       
          setSuccessMessage("Login successful! Redirecting...");
          
          setTimeout(() => navigate('/my-bookshelf'), 1500);
        } else {
          setErrorMessage(data.error || "Login failed. Please try again.");
        }
      } catch (err) {
        console.error("Error during login:", err);
        setErrorMessage("Unable to connect to the server. Please try again later.");
      }

    } catch (error) {
      console.error("Network or parsing error:", error);
      setErrorMessage("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Please enter registered details..</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>

        <p className="link">
           Don't have an account? <a href="/signup">Sign Up</a>
         </p>
      </form>
    </div>
  );
};

export default Login;
