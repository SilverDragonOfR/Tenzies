import React from "react";

function Die(props)
{
    return(
        <div onClick={() => 
        {
            if(!props.tenzies) props.handleClick(props.id)
        }} 
            className=
            {props.isHeld ? "die die__held" :"die"}
            >{props.value}</div>
    )
}

export default Die;