import {restConstants} from "../constraints/restConstants";


const initialState = {
    id: '',
    username: '',
    email: ''
};


export function authenticationReducer(state = initialState, action) {
    console.log(action.data);
    switch (action.type) {
        case restConstants.LOGOUT:
            return {
                ...state,
                id: '',
                username: '',
                email: '',
            };
        case restConstants.GET_USER_DATA:
            return{
                ...state,
                id: action.id,
                username: action.username,
                email: action.email
            };
        default:
            return {
                ...state
            }

    }
}


