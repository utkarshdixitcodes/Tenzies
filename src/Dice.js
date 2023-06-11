import React from "react" 

export default function Dice(props) {
    const val = props.valuePassed
    const adrress = props.id

    return(
         <div 
         className ={props.isHeld ? "dice-held" :"dice-notHeld"} 
         onClick = {props.clicked} 
         id = {adrress} >  {val}  
         </div>
    )
}