import React from 'react';
import { Link } from 'react-router-dom';
import {Stack, Collection, BoxArrowInRight, BoxArrowInLeft} from 'react-bootstrap-icons'
import {logout} from './../../actions/userActions'
import { useSelector } from 'react-redux';
import { userStates } from '../../redux/user';

function Navbar() {
  const userState = useSelector((state) => state.user);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <Link className="navbar-brand" to="/"> 
                Flashcards
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/decks"> 
                        Decks
                        <Stack/>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/cards"> 
                        Cards
                        <Collection/>
                    </Link>
                </li>
                {userState.user === userStates.LOGGED_IN ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                      Logout
                      <BoxArrowInLeft/>
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                      <BoxArrowInRight/>  
                    </Link>
                  </li>
                )}
            </ul>
            </div>
        </div>
    </nav>
  );
}
 
export default Navbar;