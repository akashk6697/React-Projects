import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers';


const styles = {
  width : '200px',
  margin: '20px auto',
};

const Game= ()=> {

  const[history,setHistory] = useState([Array(9).fill(null)]);
  const[stepNumber,setStepNumber] = useState(0);
  const[xIsNext,setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

const handleClick = i => {
  const timeInHistory = history.slice(0,stepNumber + 1);
  const current = timeInHistory[stepNumber];
  const squares = [...current];
// if user click an occupied square or if game is won , return 

if(winner || squares[i]) return ;

// put an X or an 0 in the clicked square

squares[i] = xIsNext ?'X' : '0';
setHistory([...timeInHistory,squares]);
setStepNumber(timeInHistory.length);
setXisNext(!xIsNext);

}


const jumpTo = step =>{
  setStepNumber(step);
  setXisNext(step % 2 === 0)

};
const renderMoves=()=>(
  history.map((_step,move) =>{
    const destination = move ? 'Go to move #' +move : 'Go to start';
  
  return (
    <li key = {move}> 
  <button onClick={() => jumpTo(move)}>{destination}</button>
  </li>
)
  })
  )
  return (
    <><Board squares={history[stepNumber]} onClick={handleClick} /><div style={styles}>
      <p>{winner ? 'Winner: ' + winner : 'NextPlayer:' + (xIsNext ? 'X' : '0')}</p>
      {renderMoves()}
    </div></>
  )
}
export default Game;
