import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {

    return (
        <div className="container">
            <h1>Welcome to Flashy</h1>
            <Link 
                className="btn btn-dark"
                role="button"
                to="/login"
                > 
                Login
            </Link>

            <Link 
                className="btn btn-dark"
                role="button"
                to="/signup"
                > 
                Signup
            </Link>

        </div>

    )
}
 
export default Landing;