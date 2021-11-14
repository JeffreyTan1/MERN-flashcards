import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { editDeck, getDeck, getDeckCards } from '../../actions/deckActions'
import Table from '../layout/Table'
import AddCard from './../cards/AddCard'

export default function ManageDeck() {
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState(null)
  const {id} = useParams();
  const [addCard, setAddCard] = useState(false)
  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleString()
  }

  useEffect(() => {
    getDeck(id).then((res) => {
      let data = (res.data.deck)
      data.date = formatDate(data.date)
      setDeck(data)
    }).catch((error) => {
      console.error(error.message)
    }
    )

    getDeckCards(id).then((res) => {
      let data = res.data.cards
      data = data.map(card => ({...card, date: formatDate(card.date)}))
      setCards(data)
    }).catch((error) => {
      console.error(error.message)
    })

  }, [id])

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
      Header: 'Last Modified',
      accessor: 'date'
    },
    {
      Header: 'Actions',
      accessor: 'remove',
      Cell: ({data, row}) => <button className="btn btn-secondary" onClick={() => {handleRemoveCard(data[row.id]._id)}}>Remove</button>
    },

  ]

  const handleRemoveCard = (_id) => {
    const data = {
      deck_id: id,
      card_id: _id,
      addingTo: false
    }
    editDeck(data).then((res) => {
    console.log(res.data)
    window.location.reload(false);
    // change data to remove the row because or else we need another get request
    }).catch((error) => {
    console.error(error.message)
    })
  }

  return (
      <div className="container">
          <h1>{deck ? deck.name : "loading"}</h1>
          <Table c={columns ? columns : []} d={cards ? cards : []}/>
          <button className="btn btn-primary" onClick={() => {setAddCard(true)}}>Add Card</button>
          {addCard && <AddCard deck_id={id}/>}
      </div>
  )
}
