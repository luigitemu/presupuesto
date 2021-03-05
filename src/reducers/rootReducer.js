import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { presupuestoReducer } from "./presupuestoReducer";
import { proyectoReducer } from "./proyectoReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    presupuesto: presupuestoReducer,
    proyecto: proyectoReducer
});
