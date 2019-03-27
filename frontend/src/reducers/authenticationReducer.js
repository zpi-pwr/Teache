import {restConstants} from "../constraints/restConstants";


const initialState = {
    id: '',
    username: '',
    email: ''
};


export function authenticationReducer(state = initialState, action) {
    console.log(action.data);
    switch (action.type) {
        case restConstants.LOGIN:
            return {
                ...state,
                id: action.data.id,
                username: action.data.username,
                email: action.data.email
            };
        case restConstants.LOGOUT:
            return {
                ...state,
                id: '',
                username: '',
                email: '',
            };
        default:
            return {
                ...state
            }

    }
}


