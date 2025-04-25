import React from 'react';  

function About() {
    return (
        <div className ="about-page">
            <h1>About this project </h1>
            <p>
                This rental management application is designed to help users organize, evaluate, and compare rental properties with ease.
  Whether you're planning to move, manage multiple listings, or just want a better overview of your options, this tool provides a clear and interactive way to handle it all.
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