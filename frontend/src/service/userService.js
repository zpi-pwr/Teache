import {ACCESS_TOKEN} from "../constraints";
import Alert from "react-s-alert";
import {restConstants} from "../constraints/restConstants";

export const userService = {
    login,
    logout
};

function login(email, password) {
    const body = {
        email: email,
        password: password
    };
    return dispatch => {
        fetch("http://localhost:8080/auth/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(data => data.json())
            .then(response => {
                console.log('UserService login: ');
                console.log(response);
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                return dispatch(getUserInfo())
            });
    };
}

function getUserInfo() {
    console.log("getUserInfo fired!");


    console.log("getUserInfo return started!");
    return dispatch => {
        fetch('http://localhost:8080/user/me', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
            .then(data => data.json())
            .then(response => {
                console.log('UserService getUserInfo: ', response);
                dispatch({
                    type: restConstants.GET_USER_DATA,
                    id: response.id,
                    username: response.name,
                    email: "XD"
                })
            })
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}
