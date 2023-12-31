import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil'
import ResetButton from './ResetButton';
import { gameStateAtom, currentPlayerAtom, currentMovesAtom, currentWinnerAtom } from '../Recoil/RecoilState'
import { postGameState, getGameState, avaliableMoves, setAvaliableMoves, getcurrentWinner, setCurrentWinnerService } from '../Assets/services/GameService';
import './game.css'
const Game = () => {

  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerAtom)
  const [currentMoves, setCurrentMoves] = useRecoilState(currentMovesAtom);
  const [currentWinner, setcurrentWinner] = useRecoilState(currentWinnerAtom);

  const winner = calculateWinner(gameState);

  // shabuddin part

  useEffect(() => {

    async function fetchGameState() {
      try {
        const response = await getGameState();
        setGameState(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchGameState();
  }, [setGameState]);

  useEffect(() => {
    async function fetchedMoves() {
      try {
        const response = await avaliableMoves();
        setCurrentMoves(response.data.len);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchedMoves();
  }, [setCurrentMoves]);


  useEffect(() => {
    async function fetchWinner() {
      try {
        const response = await getcurrentWinner();
        setcurrentWinner(response.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchWinner();
  }, [setcurrentWinner]);

  const handleClick = async (index) => {
    if (gameState[index] || winner) {
      alert('This square is already used.');
      return
    }

    const newGameState = { ...gameState };
    newGameState[index] = currentPlayer;
    setTimeout(async () => {
      try {
        await updateGameStateAndMoves(newGameState);
        setCurrentPlayer(currentPlayer === Player.Player1 ? Player.Player2 : Player.Player1);
      } catch (error) {
        console.error('Error updating game state:', error);
      }
    }, 100);
    setTimeout(async () => {
      try {
        setCurrentMoves(currentMoves - 1);
        await setAvaliableMoves(currentMoves - 1);
      } catch (error) {
        console.error('Error updating moves:', error);
      }
    }, 500);

  };


  const updateGameStateAndMoves = async (newGameState) => {
    try {
      const response = await postGameState(newGameState);
      setGameState(response.data);
    } catch (error) {
          console.error('Error updating moves:', error);
    }
  };

  const getStatus = () => {
    if (winner) {
      setTimeout(async () => {
        try {
          await setCurrentWinnerService(winner === 'X' ? "Player1" : "Player2")
        } catch (error) {
          console.error('Error updating moves:', error);
        }
      }, 1000);
      return `Winner: ${winner === 'X' ? "Player1" : "Player2"}`;
    } else if (Object.keys(gameState).length === 9) {
      return 'It\'s a draw!';
    }
  };
  const getCurrentPlayer = () => {
    if (!winner) {
      return `${currentPlayer === "X" ? "Player1" : "Player2"} - ${currentPlayer} `;
    }
  };

  const renderSquare = (index) => {
    return (
      <div key={index} className="square text-neutral-600 font-bold w-[100px] h-[100px] flex justify-center items-center border text-2xl border-solid  cursor-pointer rounded border-zinc-200 hover:bg-neutral-400" onClick={() => handleClick(index)}>
        {gameState[index]}
      </div>
    );
  };
  if (currentWinner !== '') {
    alert("Previous game Winner is " + currentWinner + "\nClick on reset to play again");
    setcurrentWinner('');
  }
  return (
    <div className="fullgame">
      {/* left */}
      <div className=" leftcard">
        <div className='leftcard1'>
          <div className='leftcard2'>TURN</div>
          <div className='leftcard3'>{getCurrentPlayer()}</div>
        </div>
      </div>
      {/* middle */}
      <div className='middleBoard'>
        <div className='middleHead'>TIC TAC TOE</div>
        <div className="middleboard ">
          {[0, 1, 2].map((row) => (
            <div className="boxes" key={row}>
              {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
            </div>
          ))}
        </div>
        <ResetButton />
      </div>
      {/* right */}
      <div className="rightcard">
        <div className='rightcard1'>
          <div className='rightcard2'>Avalible Moves: {currentMoves}</div>
          <div className='rightcard3'>{getStatus()}</div>
        </div>
      </div>
    </div>
  )
}

export default Game

const Player = {
  Player1: 'X',
  Player2: 'O'
};

const calculateWinner = (gameState) => {
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

  for (const [a, b, c] of lines) {
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return null;
};

