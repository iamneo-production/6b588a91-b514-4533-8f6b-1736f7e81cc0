import { atom} from 'recoil';

export const gameStateAtom = atom({
  key: 'gameState',
  default: {}, 
});

export const currentPlayerAtom = atom({
  key:'currentPlayerAtom',
  default:'X'
})

export const currentMovesAtom = atom({
  key:'currentMovesAtom',
  default:0
})

export const currentWinnerAtom = atom({
  key:'currentWinnerAtom',
  default:""
})
