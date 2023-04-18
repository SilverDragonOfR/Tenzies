import React from 'react';
import Die from './component/Die';
import Confetti from 'react-confetti';
import "./style/index.css";

function App()
{
  function allNewDice()
  {
    return [1,2,3,4,5,6,7,8,9,10].map((ele) => 
    (
      {id:ele, value: Math.floor(Math.random()*6 +1), isHeld: false}
    ))
  }

  function modifyNewDice(prevDice)
  {
    return prevDice.map(die => 
    (
      {id:die.id, value: die.isHeld ? die.value : Math.floor(Math.random()*6 +1), isHeld: die.isHeld}
    ))
  }
  function reRoll()
  {
    setTenzies((prevTenzies) => {return {cond: false, score: prevTenzies.score+1}})
    setDice((prevDice) =>
    {
      return modifyNewDice(prevDice)
    });
  }

  function modifyHolding(id)
  {
    setDice(prevDice =>
    {
      return prevDice.map(die =>
      {
        return {...die,isHeld: id===die.id ? !die.isHeld :die.isHeld}
      })
    })
  }

  const [dice,setDice] = React.useState(allNewDice());
  const [tenzies,setTenzies] = React.useState({cond: false, score:1});
  

  React.useEffect(() =>
  {
    let c1 = dice[0].isHeld
    
    let c2 = dice.map(die =>
    {
      c1 = c1 && die.isHeld
      return die.value
    }).filter(x => x===dice[0].value).length ===10

    if(c1 && c2)
    {
      console.log("hi")
      const best = Number(localStorage.getItem("best"))
      if(tenzies.score<best) localStorage.setItem("best",tenzies.score)
      setTenzies(prevTenzies => {return {cond: true, score: prevTenzies.score}})
    }

  },[dice,tenzies.score])

  const diceElements = dice.map(die => <Die tenzies={tenzies.cond} key={die.id} handleClick={modifyHolding} id={die.id} value={die.value} isHeld={die.isHeld} />);

  function handleClick()
  {
    if(tenzies.cond)
    {
      setTenzies(() =>
      {
        setDice(() =>
        {
          return allNewDice()
        });
        return {cond: false, score: 1}
      })
    }
    else
    {
      reRoll()
    }
  }
  return( 
    <div className='app'>

      {(tenzies.cond && tenzies.score<=localStorage.getItem("best")) && <h2 className='best'>New Best Score!!</h2>}

      <main className='main'>

        {tenzies.cond && <Confetti />}

        <h1 className="title">Tenzies</h1>
        <div className="instruction">
          <p>Roll until all dice are the same</p>
          <p>Click each die to freeze it</p>
          <p>Freeze all die with same number</p>
        </div>
        
        <div className='die__block'>
          {diceElements}
        </div>

        <button className="reroll" onClick={handleClick}
        >{tenzies.cond ? "Play Again" :"Roll"}</button>

        {!tenzies.cond ? <h4 className="score">Move: {tenzies.score}</h4>: <h4 className="score">Your Score: {tenzies.score} &nbsp; &nbsp; Best Score:{localStorage.getItem("best")}</h4>}

      </main>

    </div>
  );
}

export default App;
