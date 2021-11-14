import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Table from '../layout/Table';
import { getDecks, deleteDeck } from '../../actions/deckActions'

function Decks() {
  const [decks, setDecks] = useState([])
  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: '# cards',
      accessor: 'card_count',
      Cell: ({data, row}) => 
      <div className="manage-card-cell">
        <p>{data[row.id].cards.length}</p>
        <Link className="btn btn-secondary" to={`${window.location.pathname}/manage/${data[row.id]._id}`}>Manage</Link>
      </div>
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
      Header: 'Last Modified',
      accessor: 'date'
    },
    {
      Header: 'Actions',
      accessor: 'play',
      Cell: ({data, row}) => <Link className="btn btn-primary" to={`${window.location.pathname}/play/${data[row.id]._id}`}>Play</Link>
    },
    {
      accessor: 'edit',
      Cell: ({data, row}) => <Link className="btn btn-secondary" to={`${window.location.pathname}/edit/${data[row.id]._id}`}>Edit</Link>
    },
    {
      accessor: 'delete',
      Cell: ({data, row}) => <button className="btn btn-secondary" onClick={() => {handleDeleteDeck(data[row.id]._id)}}>Delete</button>
    }
  ]
  
  const formatDate = (date) => {
      const d = new Date(date)
      return d.toLocaleString()
  }

  useEffect(() => {
      getDecks().then((res) => {
          let data = (res.data.decks)
          data = data.map(deck => ({...deck, date: formatDate(deck.date)}))
          setDecks(data)
      }).catch((error) => {
          console.error(error.message)
      }
      )
  }, [])

  const handleDeleteDeck = (_id) => {
    if (window.confirm("Delete this deck?")) {
      const data = {deck_id: _id}
      deleteDeck(data).then((res) => {
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
              <h1>My Decks</h1> 
          </div>
          <Link 
              className="btn btn-primary"
              role="button"
              to="/addDeck"
              > 
              Add Deck
          </Link>

          <Table c={columns ? columns : []} d={decks ? decks : []}/>
      </div>

  )
}
 
export default Decks;