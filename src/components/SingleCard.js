import './SingleCard.css'
import React from 'react'

export default function SingleCard ( {card, handleChoice, flipped}){

    const handleClick = () => {
        handleChoice(card)
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
            <img className="front" src={card.src} alt="front" />
            <img className="back" src="/img/cover.png" alt="back" onClick={handleClick} />
            </div>
           
        </div>
    )
}
