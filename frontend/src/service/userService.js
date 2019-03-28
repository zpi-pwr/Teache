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
        }).then(response => {
            console.log('UserService login: ', response);
            // localStorage.setItem(ACCESS_TOKEN);
            dispatch(getUserInfo)
        })
    };
}

function getUserInfo() {
    return dispatch => {
        fetch('http://localhost:3000/api/user/me', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(response => {
            console.log('UserService getUserInfo: ', response);
            dispatch({
                id: response.data.id,
                username: response.data.name,
                email: response.data.email
            })
        })
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}
