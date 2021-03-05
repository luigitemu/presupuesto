import { types } from "../types/types";

const initialState = {
    items: [],
    total: 0
}

export const presupuestoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.itemLoad:
            return {
                ...state,
                items: [...action.payload]
            }

        case types.itemLoadTotal:
            return {
                ...state,
                total: action.payload
            }

        case types.itemAdd:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case types.itemEditItem:
            return {
                ...state,
                items: state.items.map(
                    item => item.key === action.payload.key
                        ? action.payload
                        : item
                )
            }

        case types.itemDelete:
            return {
                ...state,
                items: state.items.filter(item => item.key !== action.payload)
            }


        default:
            return state;
    }
}