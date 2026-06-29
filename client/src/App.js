import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Auth from './pages/Auth';
import Groups from './pages/Groups';
import './App.css';

const App = () => {
  // Check if user is already logged in (using the local storage key we set in Auth.jsx)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('connectedUser')));

  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          {/* If user is logged in, show Feed, otherwise redirect to Auth */}
          <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />} />

          {/* The Authentication Page */}
          <Route path="/login" element={<Auth onLoginSuccess={setUser} />} />
          <Route path="/groups" element={user ? <Groups /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;