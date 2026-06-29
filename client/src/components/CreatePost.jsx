import React, { useState } from 'react';
import $ from 'jquery'; // Assignment Requirement: Use jQuery for server calls

// The component receives a prop called 'onPostCreated'
// This is a function passed from the parent (Feed) to update the list of posts
const CreatePost = ({ onPostCreated }) => {
    // States to hold the input values
    const [text, setText] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve the connected user from localStorage
        const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

        const newPostData = {
            text: text,
            // Use the real user ID from the login session
            author: connectedUser._id,
            authorName: connectedUser.username, // Sending username for the display
            videoUrl: videoUrl || null
        };

        $.ajax({
            url: 'http://localhost:5001/api/posts',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newPostData),
            success: (createdPost) => {
                setText('');
                setVideoUrl('');
                onPostCreated(createdPost);
            },
            error: (err) => {
                alert('Server error: ' + (err.responseJSON ? err.responseJSON.message : 'Network error'));
            }
        });
    };

    return (
        <div className="create-post-container" style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3>Create a new post</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    style={{ width: '100%', height: '60px', marginBottom: '10px', padding: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Optional: Enter a video URL (e.g., mp4 link)"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                />
                <button type="submit" style={{ backgroundColor: '#3b5998', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Publish
                </button>
            </form>
        </div>
    );
};

export default CreatePost;