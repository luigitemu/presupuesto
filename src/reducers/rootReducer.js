import { combineReducers } from "redux";
import { itemReducer } from "./itemReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    item: itemReducer,
});
