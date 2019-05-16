import {restConstants} from "../constraints/restConstants";


const initialState = {
    adverts: [],
};


export function advertReducer(state = initialState, action) {
    console.log(action.data);
    switch (action.type) {
        case restConstants.GET_ADVERTS:
            return {
                ...state,
                name: action.data.name,
            };
        default:
            return {
                ...state
            }

    }
}
