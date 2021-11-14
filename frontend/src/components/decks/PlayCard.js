import React, {useEffect, useState} from 'react'
import './PlayCard.css'

export default function PlayCard ({card, handleAnswer}) {
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    setFlip(false)
  }, [card])
  
  return (
    <div className="play-card">
      {!flip ? 
      <div> 
        <h1>Front</h1>
        <hr/>
        <p>{card.front}</p>
        <button className="btn btn-primary" onClick={()=> {setFlip(true)}}>Flip</button>
      </div> 
      :
      <div>
        <h1>Back</h1>
        <hr/>
        <p>{card.back}</p>
        <button className="btn btn-success" onClick={()=> {handleAnswer(true)}}>Correct</button>
        <button className="btn btn-danger" onClick={()=> {handleAnswer(false)}}>Incorrect</button>
      </div>
      }
    </div>
    )
}