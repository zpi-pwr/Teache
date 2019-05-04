import {combineReducers} from "redux";
import {chatReducer} from "./chatReducer";
import {authenticationReducer} from "./authenticationReducer";
import {advertReducer} from "./advertReducer";

const rootReducer = combineReducers({
    chatReducer,
    authenticationReducer,
    advertReducer,
});

export default rootReducer;
