import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImage = [
  {"src": "/img/buta.png"},
  {"src": "/img/kirin.png"},
  {"src": "/img/kitsune.png"},
  {"src": "/img/kuma.png"},
  {"src": "/img/shika.png"},
  {"src": "/img/shishi.png"}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)


  const shuffleCards = () => {

    const shuffledCrads = [...cardImage, ...cardImage]
                        .sort(() => Math.random() - 0.5)
                        .map(card => ({...card, id: Math.random() }))

    setCards(shuffledCrads)
    setTurns(0)

    
  }

  const handleChoice = (card) => {
    
    choiceOne ? setChoiceTwo(card): setChoiceOne(card)

  }

  //used to compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src)
              {return {...card,matched:true}}
              else{
                return card

              }
          })
        })
        resetTurn()
      }else{
        console.log('doesnt match')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  //reset choices & increase turn value
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevState => prevState + 1)
  }


  return (
    <div className="App">
      <h1>MemoGe</h1>
      <p>Click the cards and Match them:)</p>

      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
      {
        cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice} 
          flipped={card.matched || card === choiceOne || card === choiceTwo}
          />
        ))
      }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App