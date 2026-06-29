import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('connectedUser');
        navigate('/login');
        window.location.reload(); // רענון עמוד כדי שה-App.js יזהה שהמשתמש יצא
    };

    return (
        <nav className="navbar">
            <h1 className="logo">MySocial</h1>
            <div className="nav-links">
                <Link to="/">Feed</Link>
                <Link to="/groups">Groups</Link>
                <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;