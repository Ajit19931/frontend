import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/error.css";


const Error = () => {
    return (
        <> 
        <section className="error-part">
            <div className="container">
                <h1>404 | Not Found</h1>
                <img className="img-fluid" src={require('../assets/images/error.png')} alt="error" />
                <h3>ooopps! this page can't be found.</h3>
                <p>It looks like nothing was found at this location.</p>
                <Link to="/">go to home</Link>
            </div>
        </section>
        </>
    )
}

export default Error