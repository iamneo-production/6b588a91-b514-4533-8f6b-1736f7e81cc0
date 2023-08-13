import http from "../http/http-common";

export const getGameState = () => {
    return http.get("/gameState");
};

export const postGameState = (newState)=>{
    return http.post('/gameState',newState)
}

export const resetGame = () => {
    return http.post("/gameState", {});
};

export const avaliableMoves = ()=>{
    return http.get('/avaliableMoves');
}

export const setAvaliableMoves = (value) =>{
    return http.post('/avaliableMoves',{len:value})
}

export const getcurrentWinner = ()=>{
    return http.get('/checkWinner');
}

export const setCurrentWinnerService = (value) =>{
    return http.post('/checkWinner',{name:value})
}



