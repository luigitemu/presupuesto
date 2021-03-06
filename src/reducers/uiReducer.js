import { types } from "../types/types";


const initialState = {
    menuOpen: false,
    modalOpen: false,
    modalEditOpen: false,
    loading: false
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

        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
        case types.uiOpenModalEdit:
            return {
                ...state,
                modalEditOpen: true
            }
        case types.uiCloseModalEdit:
            return {
                ...state,
                modalEditOpen: false
            }
        case types.startLoading:
            return {
                ...state,
                loading: true
            }
        case types.finishLoading:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}