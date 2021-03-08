import { types } from "../types/types";


const initialState = {
    projects: [],
    activeProject: {}
}

export const proyectoReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.proyectoAdd:
            return {
                ...state,
                projects: [action.payload, ...state.projects]
            };
        case types.proyectoLoad:
            return {
                ...state,
                projects: [...action.payload]
            };

        case types.setActiveProject:
            return {
                ...state,
                activeProject: { ...action.payload }
            }

        case types.proyectoDelete:
            return {
                ...state,
                projects: state.projects.filter(p => p.id !== action.payload)
            }
        case types.proyectoCleanLogOut:
            return initialState

        case types.proyectoEdit:
            return {
                ...state,
                projects: state.projects.map(p =>
                    p.id === action.payload.id
                        ? action.payload.project
                        : p
                )
            }
        default:
            return state;
    }
}