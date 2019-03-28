import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";

const middleware = [thunkMiddleware];

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
