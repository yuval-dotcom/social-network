import React from 'react';
import { Link } from 'react-router-dom'; // Used for navigating without refreshing the page

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="logo">MySocial</h1>
            <div className="nav-links">
                {/* Link acts like an <a> tag, but works with React Router */}
                <Link to="/">Feed</Link>
                <Link to="/groups">Groups</Link>
            </div>
        </nav>
    );
};

export default Navbar;