// // // import React, { useState, useEffect } from 'react';
// // // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // // import axios from 'axios';
// // // import './App.css';

// // // // Importing Components
// // // import Navbar from './components/Navbar';
// // // import Footer from './components/Footer';
// // // import MyBookshelf from './pages/MyBookshelf';
// // // import Login from './pages/Login';
// // // import Signup from './pages/Signup';
// // // import Dashboard from './pages/Dashboard';

// // // const App = () => {
// // //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// // //   const [loading, setLoading] = useState(true);

// // //   // Check if user is authenticated
// // //   useEffect(() => {
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       setIsAuthenticated(true);
// // //     }
// // //     setLoading(false);
// // //   }, []);

// // //   // If the app is still loading, show a loading screen
// // //   if (loading) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   return (
// // //     <Router>
// // //       <div className="App">
// // //         <Navbar />
// // //         <div className="container">
// // //           <Routes>
// // //             {/* Public routes (accessible for everyone) */}
// // //             <Route path="/" element={<Dashboard />} />
// // //             <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/my-bookshelf" />} />
// // //             <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/my-bookshelf" />} />
            
// // //             {/* Private route (accessible only if authenticated) */}
// // //             <Route 
// // //               path="/my-bookshelf" 
// // //               element={isAuthenticated ? <MyBookshelf /> : <Navigate to="/login" />} 
// // //             />
// // //           </Routes>
// // //         </div>
// // //         <Footer />
// // //       </div>
// // //     </Router>
// // //   );
// // // };

// // // export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/Home';
import MyBookshelf from './pages/MyBookshelf';
import SearchBooks from './pages/SearchBooks';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/mybookshelf" element={<MyBookshelf />} />
            <Route path="/searchbooks" element={<SearchBooks />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App; //Already in GITHUB

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Dashboard from "./pages/Dashboard";
// import MyBookshelf from "./pages/MyBookshelf";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import BookDetails from "./pages/BookDetails";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/mybookshelf" element={<MyBookshelf />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/book/:id" element={<BookDetails />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

