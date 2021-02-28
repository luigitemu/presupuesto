import { types } from "../types/types";

const initialState = {
    items: [],
    total: 0
}

export const itemReducer = (state = initialState, action) => {
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


        default:
            return state;
    }
}