import { types } from "../types/types";


const initialState = {
    menuOpen: false
}


export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiHideMenu:
            return {
                ...state,
                menuOpen: true
            }
        case types.uiShowMenu:
            return {
                ...state,
                menuOpen: false
            }
        default:
            return state;
    }
}