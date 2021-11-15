import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { editDeck, getDecks } from '../../actions/deckActions'
import Table from '../layout/Table'
import { editCard, getCard, getCardDecks } from '../../actions/cardActions'

export default function ManageCard() {
  const [cardDecks, setCardDecks] = useState(null)
  const [decks, setDecks] = useState(null)
  const [card, setCard] = useState(null)
  const {id} = useParams();

  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleString()
  }

  useEffect(() => {
    getCard(id).then((res) => {
      let cardData = (res.data.card)
      cardData.date = formatDate(cardData.date)
      setCard(cardData)
      getCardDecks(id).then((res) => {
        let cardDeckData = res.data.decks
        cardDeckData = cardDeckData.map(deck => ({...deck, date: formatDate(deck.date)}))
        setCardDecks(cardDeckData)
        getDecks().then((res) => {
          let deckData = res.data.decks
          deckData = deckData.map(deck => ({...deck, date: formatDate(deck.date)}))
          const filtered = deckData.filter(function(el) { 
            let filter = true
            cardDeckData.forEach(element => {
              if(element._id === el._id) {
                filter = false
              }
            })
            return filter
          }); 
          setDecks(filtered)
          
        }).catch((error) => {
          console.error(error.message)
        })
      }).catch((error) => {
        console.error(error.message)
      })
    }).catch((error) => {
      console.error(error.message)
    })
    
  }, [id])

  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
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
      Cell: ({data, row}) => <button className="btn btn-secondary" onClick={() => {handleRemoveDeck(data[row.id]._id)}}>Remove</button>
    },
  ]

  const handleRemoveDeck = (_id) => {
    console.log(_id)
    const data = {
      deck_id: _id,
      card_id: id,
      addingTo: false
    }
    editCard(data).then((res) => {
    window.location.reload(false);
    }).catch((error) => {
    console.error(error.message)
    })
  }

  const handleAddDeck = (_id) => {
    const data = {
      card_id: id,
      deck_id: _id,
      addingTo: true,
    }
    editDeck(data).then((res) => {
      window.location.reload(false)
    }).catch((error) => {
    console.error(error.message)
    })
  
  }

  const AddToDeck = () => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Add',
        accessor: 'add',
        Cell: ({data, row}) => <button className="btn btn-secondary" onClick={() => {handleAddDeck(data[row.id]._id)}}>Add to deck</button>
      },
    ]
    
    return (
      <div>
        <Table c={columns ? columns : []} d={decks ? decks : []}/>
      </div>
    )
  }

  return (
      <div className="container">
          <h1>Front:</h1>
          <p>{card?.front}</p> <hr/>
          <h1>Back:</h1>
          <p>{card?.back}</p> <hr/>
          <h2>Associated Decks</h2> <hr/>
          <Table c={columns ? columns : []} d={cardDecks ? cardDecks : []}/>
          {/* <button className="btn btn-primary" onClick={() => {setAddCard(true)}}>Add Card</button>
          {addCard && <AddCard deck_id={id}/>} */}
          <h2>Non-associated Decks</h2> <hr/>
          <AddToDeck/>
      </div>
  )
}
