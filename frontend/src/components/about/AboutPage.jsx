import React from 'react';  

function About() {
    return (
        <div className ="about-page">
            <h1>About this project </h1>
            <p>
                This application is designed to help users manage and track their rental properties efficiently.
                With our tool, you can add, edit, and delete property listings, view details about each property, and much more.
            </p>
            <h2>Features</h2>
            <ul>
                <li>View a list of all properties</li>
                <li>View details about each property</li>
                <li>Add a new property</li>
                <li>Edit an existing property</li>
                <li>Delete a property</li>
            </ul>

        </div>
    );
}

export default About;