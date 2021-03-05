import { types } from "../types/types"


const initialState = {
    uid: null,
    name: null
}



export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                uid: action.payload.uid,
                name: action.payload.name
            };
        case types.authLogout:
            return initialState;

        default:
            return state;
    }
}