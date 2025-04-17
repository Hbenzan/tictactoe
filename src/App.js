
import {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { useState } from 'react';

// representing a single square in the tic-tac-toe board.
function Square({ value, onSquareClick }) {
  return ( 
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  );
}

//   function handleClick() {
//     setValue('X');
//   }

//   return (
//     <button
//       className="square"
//       onClick={handleClick}
//     >
//       {value}
//     </button>
//   );
// }

// Manages the game board state and rendering.
function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));
   
  // Calculate the winner based on current squares.
  const winner = calculateWinner(squares);
  
  // Determine game status based on winner or next player turn.
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  
  // Handle square click event to update game state.
  function handleClick(i) { //when you click on something in board it will change whats in the box
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

  }
  
  // Render the game board with squares and game status.
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Manages game history and handles player moves.
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Update game history and current move when a square is played.
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); 
  }
  
  // Jump to a specific move in the game history.
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Generate list of moves with buttons to jump to specific points in history.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the game board and move history.
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
      <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate if there's a winner based on the current squares configuration.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winning symbol ('X' or 'O')
    }
  }
  return null; // Return null if no winner
}
