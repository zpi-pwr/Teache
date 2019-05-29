import {TOKEN_SPRING} from "../constraints";

export const restActions = {
    restGet,
    restPost,
    restDelete,
};
function restPost(item, endpoint, type) {
    return dispatch => {
        fetch(endpoint, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_SPRING)
            },
            body: JSON.stringify(item)
        }).then(response =>{
                dispatch({
                    status: response.status,
                    type: type,
                    data: response.data
                })
            })
    }
}

function restGet(endpoint, type) {
    return dispatch => {
        fetch(endpoint, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_SPRING)
            }.then(get =>{
                dispatch({
                    status: get.status,
                    type: type,
                    data: get.data
                })
            })
        })
    }
}

function restDelete(id, endpoint, type) {
    return dispatch => {
        fetch(endpoint +'/'+id, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_SPRING)
            }.then(response =>{
                dispatch({
                    status: response.status,
                    type: type,
                    data: response.data
                })
            })
        })
    }
}
