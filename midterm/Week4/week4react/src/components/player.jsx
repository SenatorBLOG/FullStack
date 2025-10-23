import { useState } from "react";
const Player = ({title}) => {

    let [score, setScore] = useState(0);

    const spanStyles = {
        fontWeight: "bold",
        fontSize: "16px",
        backgroundColor: "green",
        color: "white"
    }
    //handling increment
    const handleIncrement = ()=>{
        console.log("incremented")
        score=score+1;
        setScore(score);
    }
    //handling decrement
    const handleDecrement = ()=>{
        console.log("decremented")
        score=score-1;
        score=score<0?0:score
        setScore(score);
    }

    //format the score - 0-->zero otherwise the number
    const formatScore=()=> score===0?"Zero":score

    return ( <div className="player">
        <span className="badge bg-secondary m-2 p-2">{title}</span>
        <span style={spanStyles}>Score is {formatScore()}</span>
        <button onClick={handleIncrement} className="btn btn-secondary m-2 p-2">Increment</button>
        <button onClick={handleDecrement} className="btn btn-secondary m-2 p-2">Decrement</button>
    </div> );
}
 
export default Player;