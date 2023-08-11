// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board(xIsNext, squares, onPlay){
  console.log("I am square: ", squares);
  function handleClick(i){
    if(calculateWinner(squares) || squares[i])
      return;
    const nextSquares = squares.entries.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status = winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O");
  return (
    <>
      <div className="board">
        <div className = "board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className = "board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className = "board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <div className="status">{status}</div>
    </>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]); //check this declaration. history is an array with single item;
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  // const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; //spread operator used
    setHistory(nextHistory);
    // setXIsNext(!xIsNext);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove)
  {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove%2 === 0);
  }
  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Go to move #" + move : "Go to Game Start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares){
  const lines= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // if(squares[a] && squares[b] === squares[b] && squares[a] === squares[c]){
    //   return squares[a];
    // }
    if(squares[a] == squares[b] && squares[b] == squares[c])
      return squares[a];
  }
  return null;
}