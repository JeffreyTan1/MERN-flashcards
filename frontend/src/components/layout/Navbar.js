import React, {useState, useEffect} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {Stack, Collection} from 'react-bootstrap-icons'
import decode from 'jwt-decode';
import {logout} from './../../actions/userActions'

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const location = useLocation();

  useEffect(() => {
    console.log("navbar expired token check")
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [location, user?.token]);
  
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
                {user?.result ? (
                  <li className="nav-item">
                    {/* logout should push login so no to prop here */}
                    <Link className="nav-link" onClick={logout}>Logout</Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                )}
            </ul>
            </div>
        </div>
    </nav>
  );
}
 
export default Navbar;