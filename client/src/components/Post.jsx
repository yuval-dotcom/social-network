import React, { useState } from 'react';

// This component represents a single post
const Post = ({ postData }) => {
    // State to manage the Like button toggle
    const [isLiked, setIsLiked] = useState(false);

    // Function to handle the like button click
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        // Here we will later add the $.ajax call to update MongoDB
    };

    return (
        <div className="post-content">
            <div className="post-header">
                <h3>{postData.authorName || 'Unknown Author'}</h3>
                <span>{postData.date}</span>
            </div>

            <div>
                <p>{postData.text}</p>

                {/* HTML5 Video Requirement */}
                {postData.videoUrl && (
                    <video width="100%" height="auto" controls>
                        <source src={postData.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>

            <div className="post-actions" style={{ marginTop: '10px' }}>
                <button onClick={handleLikeClick} style={{ marginRight: '10px' }}>
                    {isLiked ? 'Unlike' : 'Like'}
                </button>
                <button>Comment</button>
            </div>
        </div>
    );
};

export default Post;