import {restConstants} from "../constraints/restConstants";


const initialState = {
    adverts: [
        {
            title: 'Wesołe pietruchy',
            tags: [
                {name: "matematyka", color: "#003a14"},
                {name: "am1", color: "#8a6496"}
            ]
        },
        {title: 'adv2'},
        {title: 'adv3'},
        {title: 'adv4'},
        {title: 'adv5'},
    ],
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