import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDeck, getDeckCards } from '../../actions/deckActions'
import Progress from './Progress'
import PlayCard from './PlayCard'
import Table from '../layout/Table'

export default function Play () {
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState(null)
  const {id} = useParams();
  const [questionIndex, setQuestionCount] = useState(0)
  const [results, setResults] = useState(Array)
  const [gameOver, setGameOver] = useState(false)
  const [completion, setCompletion] = useState(0)
  

  useEffect(() => {
    getDeck(id).then((res) => {
      let data = (res.data.deck)
      setDeck(data)
    }).catch((error) => {
      console.error(error.message)
    }
    )

    getDeckCards(id).then((res) => {
      let data = res.data.cards
      setCards(data)
      setCompletion(Math.floor(questionIndex/cards?.length * 100))
    }).catch((error) => {
      console.error(error.message)
    })
  }, [])

  useEffect(() => {
    setCompletion(Math.floor((questionIndex) / cards?.length * 100))
  }, [cards?.length, questionIndex])
  
  let columns = [
    {
    Header: 'Front',
    accessor: 'front'
    },
    {
      Header: 'Back',
      accessor: 'back'
    },
    {
      Header: 'Result',
      accessor: 'result',
    }
  ]
  

  const handleAnswer = (correct) => {
    const verdict = correct ? "PASS" : "FAIL"
    setResults(results => [...results, verdict])  
  
    if (questionIndex + 1 >= cards?.length) {
      setQuestionCount(questionIndex + 1)
      setGameOver(true)
    } else {
      setQuestionCount(questionIndex + 1)
    }  
  }

  

  return (
    
    <div className="container">
      <h1>{deck ? deck.name : "loading..."}</h1>
        <Progress completion={completion}/>
        {
          gameOver ? 
          <div>
            <h2>Done</h2>
            <Table c={columns} d={cards?.map((card, index) => ({...card, result: results[index]}))}/>
            <Link className="btn btn-primary" to="/decks">Return to decks</Link>
            <button className="btn btn-secondary" onClick={()=>{window.location.reload(false);}}>Restart</button>
          </div>
          :
          (!cards ? 
            <p>Loading... </p>
            : cards && cards.length != 0 ?
            <div> 
              <PlayCard card={cards[questionIndex]} handleAnswer={handleAnswer}/>
            </div>
            : 
            <div className="play-card">
              No cards
              <Link className="btn btn-primary" to="/decks">Return to decks</Link>
            </div>
          )
        }
      
    </div>
    
    )}