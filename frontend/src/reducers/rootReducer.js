import {combineReducers} from "redux";
import {chatReducer} from "./chatReducer";
import {authenticationReducer} from "./authenticationReducer";

const rootReducer = combineReducers({
    chatReducer,
    authenticationReducer,
});

export default rootReducer;
