import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const Groups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch groups from the server
        $.ajax({
            url: 'http://localhost:5001/api/groups',
            method: 'GET',
            success: (data) => {
                setGroups(data);
            },
            error: (err) => {
                console.error('Error fetching groups:', err);
            }
        });
    }, []);

    return (
        <div className="groups-container" style={{ padding: '20px' }}>
            <h2>Available Groups</h2>
            <div className="groups-list">
                {groups.map(group => (
                    <div key={group._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                        <small>Admins: {group.admins.length}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groups;