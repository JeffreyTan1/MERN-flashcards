import React from 'react';
import { Link } from 'react-router-dom';
import { DecksTable } from './DecksTable';

function Decks() {
    return (
        <div className="container">
            <div className="page-heading">
               <h1>My Decks</h1> 
            </div>
            <Link 
                className="btn btn-dark"
                role="button"
                to="/addDeck"
                > 
                Add Deck
            </Link>

            <DecksTable/>
        </div>

    )
}
 
export default Decks;