import {restConstants} from "../constraints/restConstants";


const initialState = {
    adverts: [
        {
            id: '1',
            title: 'Wesołe pietruchy',
            tags: [
                {name: "matematyka", color: "#003a14"},
                {name: "am1", color: "#8a6496"}
            ]
        },
        {id: '2', title: 'adv2'},
        {id: '3', title: 'adv3'},
        {id: '4', title: 'adv4'},
        {id: '5', title: 'adv5'},
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