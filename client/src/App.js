import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import './App.css'; // We will add the required CSS3 properties here

const App = () => {
  return (
    // Router wraps the entire application to enable navigation
    <Router>
      <div className="app-container">
        {/* The Navbar will always be visible at the top */}
        <Navbar />

        {/* Routes decide which component to show based on the URL */}
        <Routes>
          {/* When the path is '/', show the Feed component */}
          <Route path="/" element={<Feed />} />

          {/* TODO for later: Add the Groups page route here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;