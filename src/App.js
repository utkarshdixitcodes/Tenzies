import './App.css';
import React from "react"
import { nanoid }from "./nanoid"
import Dice from "./Dice.js"
import Confetti from 'react-confetti';

function App() {
  //State declaration for DiceArray and tenzies state for checking userwon
   const [diceArray , setDiceArray] = React.useState(setDice())
   const [tenzies , setTenzies] = React.useState(false)

  //generates each Element of DiceArray
  function generateDie(){
    return{
      value : Math.ceil(Math.random() * 6) ,
      isHeld : false , 
      id : nanoid()
    }
  }

  //Generates the blocks of Array
  function setDice(){
      const arr = [] 
       for(let i = 0 ; i<10 ; i++){
      arr.push(generateDie())
  }
  return arr
} 
function reset(){
  setTenzies(false)
  setDiceArray(setDice())
}
  
// Funtion for rolling the dice when clicked
function ReRoll (){
  tenzies ? reset()
     :
    setDiceArray(oldArray => oldArray.map(item => {
      if(item.isHeld === true){
        return item
        }
        else{
        return    generateDie()
        }
    }))
  }

  //function for holding the elements which are clicked
   function clicked(id){
   setDiceArray(oldArray => oldArray.map(item =>{
     return  item.id === id ?
      {...item , isHeld : !item.isHeld } :
      item
   }))
  }

  const setDiceElements = diceArray.map(item => {
    return   <Dice 
    className = "dice"        
    valuePassed = {item.value} 
    key = {item.id} 
    isHeld = {item.isHeld}
    clicked = {() => clicked(item.id)}
     />
}) 

React.useEffect(() =>{
  const truish = diceArray.every(item => item.isHeld === true)
  const firstValue = diceArray[1].value
  const sameValue = diceArray.every( item => item.value === firstValue)
  if(truish && sameValue){
    setTenzies(true)
  }

}, [diceArray])

  return (
    <div className="App">
      {tenzies && <Confetti /> }
       <h1 >Tenzies</h1>
       <p className= "Game-rule" >Roll Dice until all the dices are same .Click
       <br />each dice to freeze it at its current value
       <br />between rolls
       </p>
       <div className="diceArray" >{setDiceElements}</div>
      <button className="resetDice"  onClick = {ReRoll}   >
        {tenzies ? "NEW GAME" : "ROLL"}
        </button>
    </div>
  );
}

export default App;
