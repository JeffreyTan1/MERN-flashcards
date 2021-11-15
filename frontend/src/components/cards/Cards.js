import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Table from '../layout/Table';
import {getCards, deleteCard} from '../../actions/cardActions'
import { getDecks } from '../../actions/deckActions'

function Cards() {
  const [cards, setCards] = useState([])

  const columns = [
      {
        Header: 'Front',
        accessor: 'front'
      },
      {
        Header: 'Back',
        accessor: 'back'
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({row}) => 
        <ul className="table-list">
          {row.original.tags.map((tag, index) => (<li key={index}>{tag}</li>))}
        </ul>
      },
      {
        Header: 'Decks',
        accessor: 'decks',
        Cell: ({data, row}) => 
        <div>
          <ul className="table-list">
            {row.original.decks?.map((deck, index) => (<li key={index}>{deck}</li>))}
          </ul>
          <div className="manage-card-cell">
          <Link className="btn btn-secondary" to={`${window.location.pathname}/manage/${data[row.id]._id}`}>Manage</Link>
          </div>
        </div>
      },
      {
        Header: 'Last Modified',
        accessor: 'date'
      },
      {
        Header: 'Actions',
        accessor: 'edit',
        Cell: ({data, row}) => <Link className="btn btn-secondary" to={`${window.location.pathname}/edit/${data[row.id]._id}`}>Edit</Link>
      },
      {
        accessor: 'delete',
        Cell: ({data, row}) => <button className="btn btn-secondary" onClick={() => {handleDeleteCard(data[row.id]._id)}}>Delete</button>
      }
      
  ]

  const formatDate = (date) => {
      const d = new Date(date)
      return d.toLocaleString()
  }

  useEffect(() => {
      getCards().then((res) => {
        let cardsData = (res.data.cards)
        cardsData = cardsData.map(card => ({...card, date: formatDate(card.date)}))
        
        getDecks().then((res) => {
          let decksData = (res.data.decks)
          cardsData = cardsData.map(card => ({...card, decks: card.decks?.map(deck => decksData.find(e => e._id === deck)?.name)}))
          setCards(cardsData)

        }).catch((error) => {
          console.error(error.message)
        }
        )
      }).catch((error) => {
        console.error(error.message)
      }
      )

      
  }, [])

  const handleDeleteCard = (_id) => {
    if (window.confirm("Delete this card?")) {
        const data = {card_id: _id}
        deleteCard(data).then((res) => {
        console.log(res.data)
        window.location.reload(false);
        }).catch((error) => {
        console.error(error.message)
        })
    }
  }

  return (
      <div className="container">
          <div className="page-heading">
              <h1>My Cards</h1> 
          </div>
          <Link 
              className="btn btn-primary"
              role="button"
              to="/addCard"
              > 
              Add Card
          </Link>

          <Table c={columns ? columns : []} d={cards ? cards : []}/>
      </div>

  )
}

export default Cards;