export const initialState = {
    isModalOpen: true,
    content: 'menu'
}

export function modalReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { ...state, isModalOpen: true, content: action.payload || state.content };
        case 'CLOSE_MODAL':
            return { ...state, isModalOpen: false };
        case 'SET_CONTENT':
            return { ...state, content: action.payload };
        default:
            throw new Error();
    }
}