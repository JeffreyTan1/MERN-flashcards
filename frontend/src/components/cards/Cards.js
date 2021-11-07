import React from 'react';
import { Link } from 'react-router-dom';
import { CardsTable } from './CardsTable';

function Cards() {
    return (
        <div className="container">
            <div className="page-heading">
               <h1>My Cards</h1> 
            </div>
            <Link 
                className="btn btn-dark"
                role="button"
                to="/addCard"
                > 
                Add Card
            </Link>

            <CardsTable/>
        </div>

    )
}
 
export default Cards;