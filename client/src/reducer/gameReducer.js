import { GAME_STATES } from "../constants/gameState";

export const initialState = {
    gameMode: 'menu',
    gameState: GAME_STATES.START,
    board: [],
    word: '',
    definition: '',
    remainingAttempts: 3,
    dailyScore: []
}

export function gameReducer(state, action) {
    switch (action.type) {
        case 'SET_GAME_MODE':
            return { ...state, gameMode: action.payload };
        case 'SET_GAME_STATE':
            return { ...state, gameState: action.payload };
        case 'SET_BOARD':
            return { ...state, board: action.payload };
        case 'SET_WORD':
            return { ...state, word: action.payload };
        case 'SET_DEFINITION':
            return { ...state, definition: action.payload };
        case 'REDUCE_ATTEMPTS':
            return { ...state, remainingAttempts: state.remainingAttempts > 0 ? state.remainingAttempts - 1 : 0 };
        case 'RESET_ATTEMPTS':
            return { ...state, remainingAttempts: 3 };
        case 'SET_ATTEMPTS':
            return { ...state, remainingAttempts: action.payload };
        case 'SET_DAILY_SCORE':
            return { ...state, dailyScore: action.payload };
        default:
            throw new Error();
    }
}