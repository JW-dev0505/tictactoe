import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Pannel } from './components';
import { useAccount } from 'wagmi';
import './App.css';

const App: React.FC = () => {
  const { address, isConnected } = useAccount();

  // Game state: 3x3 grid, 0 means empty, 1 means circle, 2 means cross
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [isCircleTurn, setIsCircleTurn] = useState(true); // Track who's turn it is
  const [winner, setWinner] = useState<null | string>(null); // Track the winner

  // Handle clicking a panel
  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== 0 || winner) return; // Ignore if panel is already filled or game is over

    const newBoard = board.map((rowArr, rowIndex) =>
      rowArr.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return isCircleTurn ? 1 : 2; // Set the current player's symbol
        }
        return cell;
      })
    );

    setBoard(newBoard); // Update the board
    setIsCircleTurn(!isCircleTurn); // Toggle turn
  };

  // Check for a winner after each move
  useEffect(() => {
    const checkWinner = () => {
      // Check rows
      for (let i = 0; i < 3; i++) {
        if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          return board[i][0] === 1 ? 'Circle' : 'Cross';
        }
      }
      // Check columns
      for (let i = 0; i < 3; i++) {
        if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          return board[0][i] === 1 ? 'Circle' : 'Cross';
        }
      }
      // Check diagonals
      if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0] === 1 ? 'Circle' : 'Cross';
      }
      if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2] === 1 ? 'Circle' : 'Cross';
      }
      // Check for a draw (no empty cells left)
      if (board.every(row => row.every(cell => cell !== 0))) {
        return 'Draw';
      }
      return null;
    };

    const result = checkWinner();
    if (result) {
      setWinner(result); // Set the winner if found
    }
  }, [board]);

  // Render the game board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => (
          <Pannel
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            handleClick={() => handleClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ));
  };

  const reset = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setWinner(null); // Reset the winner state
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Tic Tac Toe</h1>
        <div className="walletbutton">
          {isConnected ? <p>Connected Wallet: {address}</p> : <ConnectButton />}
        </div>
      </div>
      <div className="game">
        {renderBoard()}
      </div>
      {winner && (
        <div className="winner-message">
          <h2>{winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}</h2>
        </div>
      )}
      <div className="button-panel">
        <button className="clearbutton" onClick={reset}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default App;
