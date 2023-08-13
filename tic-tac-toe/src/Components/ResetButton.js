import React from 'react'
import {resetGame,setAvaliableMoves, setCurrentWinnerService} from '../Assets/services/GameService'
import { useSetRecoilState } from 'recoil'
import {gameStateAtom,currentPlayerAtom, currentMovesAtom, currentWinnerAtom} from '../Recoil/RecoilState'
import './resetbutton.css'

const ResetButton = () => {
  const setCurrentPlayer = useSetRecoilState(currentPlayerAtom);
  const setGameState = useSetRecoilState(gameStateAtom);
  const setCurrentMoves = useSetRecoilState(currentMovesAtom);
  const setcurrentWinner = useSetRecoilState(currentWinnerAtom);

  const handleClear = () =>{
setTimeout(async () => {
  try {
    await resetGame();
    setGameState({});
    setCurrentPlayer('X');
    setCurrentMoves(9);
  } catch (error) {
    console.error('Error resetting game state:', error);
  }
}, 200);
setTimeout(async () => {
  try {
    await setAvaliableMoves(9);
  } catch (error) {
    console.error('Error resetting available moves:', error);
  }
}, 600);

setTimeout(async () => {
  try {
    await setCurrentWinnerService('');
    setcurrentWinner('');
  } catch (error) {
    console.error('Error resetting available moves:', error);
  }
}, 700);

      }
  return (
    <div>
         <input className='btn' type="submit" value="Reset Game" onClick={()=>handleClear()}/>
    </div>
  )
}

export default ResetButton
