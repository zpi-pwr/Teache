import {TOKEN_EXPRESS, TOKEN_SPRING} from "../constraints";
import Alert from "react-s-alert";
import {restConstants} from "../constraints/restConstants";

export const userService = {
    login,
    register,
    logout
};

function login(email, password) {
    const body = {
        email: email,
        password: password
    };
    return dispatch => {
        fetch("http://localhost:8080/api/auth/login", {
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
                localStorage.setItem(TOKEN_SPRING, response.accessToken);
                return dispatch(getUserInfo(email, password))
            });
    };
}

function register(body) {
    return dispatch => {
        fetch("http://localhost:8080/api/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(data => data.json())
            .then(response => {
                console.log('UserService register: ');
                console.log(response);
            });
    };
}

function getUserInfo(email, password) {
    console.log("getUserInfo fired!");

    let user = {};
    console.log("getUserInfo return started!");
    return dispatch => {
        fetch('http://localhost:8080/api/user/me', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_SPRING)
            }
        })
            .then(data => data.json())
            .then(response => {
                console.log('UserService getUserInfo: ', response);
                user = {
                    type: restConstants.GET_USER_DATA,
                    id: response.id,
                    username: response.name,
                    email: "XD"
                }
                // dispatch({
                //     type: restConstants.GET_USER_DATA,
                //     id: response.id,
                //     username: response.name,
                //     email: "XD"
                // })
            }).then(fetch('http://localhost:4000/graphql', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: `{
    "query": "query {login(email: \\"${email}\\", password: \\"${password}\\"){token userId}}"
}`,
        }).then(response => response.json())
            .then(data => {
                console.log("GQL Login response");
                console.log(data.data.login.token);
                console.log(data.data.login.userId);
                // response = response.json();
                localStorage.setItem(TOKEN_EXPRESS, data.data.login.token);
                dispatch({
                    type: restConstants.GET_USER_DATA,
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    idExpress: data.data.login.userId
                })
            }))
    }
}

function logout() {
    localStorage.removeItem(TOKEN_SPRING);
    localStorage.removeItem(TOKEN_EXPRESS);
    localStorage.removeItem('token');
    localStorage.removeItem('username');

}
