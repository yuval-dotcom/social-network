import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Import JQuery
import Post from '../components/Post'; // Import the Post component we created earlier
import CreatePost from '../components/CreatePost';
const Feed = () => {
    // State to store the array of posts we receive from the server
    const [posts, setPosts] = useState([]);

    // useEffect runs once when the page loads - perfect time to fetch data
    useEffect(() => {
        // Assignment Requirement: Use Ajax from JQuery to fetch data
        $.ajax({
            url: 'http://127.0.0.1:5001/api/posts', // The route we created on the server (GET)
            method: 'GET',
            success: (data) => {
                // If the request is successful, save the data in the React state
                setPosts(data);
            },
            error: (err) => {
                // Error handling (Assignment requirement: handle edge cases and errors)
                console.error('Error fetching posts:', err);
                alert('Error loading posts from the server');
            }
        });
    }, []); // Empty array means this runs only once when the component mounts

    // Function to add the new post to the top of the feed without refreshing the page
    const handleNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="feed-container">
            <h2>Main Feed</h2>

            {/* Render the CreatePost component and pass the update function */}
            <CreatePost onPostCreated={handleNewPost} />

            <div className="posts-list">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <Post key={post._id} postData={post} />
                    ))
                ) : (
                    <p>Loading posts... (Or no posts to display)</p>
                )}
            </div>
        </div>
    );
};

export default Feed;