import React, { useState } from 'react';
import $ from 'jquery'; // Assignment Requirement: Use jQuery for server calls
import { useNavigate } from 'react-router-dom';

// This component handles BOTH Login and Registration
const Auth = ({ onLoginSuccess }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Used to redirect the user after successful login

    const handleSubmit = (e) => {
        e.preventDefault();

        // Determine if we are hitting the login route or register route
        const url = isLoginMode
            ? 'http://127.0.0.1:5001/api/users/login'
            : 'http://127.0.0.1:5001/api/users';

        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, password }),
            success: (userData) => {
                // Save the connected user locally so React remembers them
                localStorage.setItem('connectedUser', JSON.stringify(userData));

                alert(isLoginMode ? 'Logged in successfully!' : 'Registered successfully!');

                // Call the function passed from App.js to update the global state
                if (onLoginSuccess) {
                    onLoginSuccess(userData);
                }

                // Redirect the user to the Main Feed
                navigate('/');
            },
            error: (err) => {
                const errorMessage = err.responseJSON ? err.responseJSON.message : 'Connection error';
                alert('Error: ' + errorMessage);
            }
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '15px', padding: '10px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '15px', padding: '10px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#3b5998', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {isLoginMode ? 'Login' : 'Sign Up'}
                </button>
            </form>

            {/* Toggle between Login and Registration mode */}
            <p style={{ textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#3b5998' }} onClick={() => setIsLoginMode(!isLoginMode)}>
                {isLoginMode ? "Don't have an account? Register here" : "Already have an account? Login here"}
            </p>
        </div>
    );
};

export default Auth;