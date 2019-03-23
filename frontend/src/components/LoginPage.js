import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import Alert from "react-s-alert"
import {ACCESS_TOKEN} from "../constraints";

class LoginPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            redirectToReferer: false,
            userInfo: {
                email: "",
                password: "",
            }
        }
    }



    login = () => {
        console.log(JSON.stringify(this.state.userInfo));
        fetch("http://localhost:3000/auth/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.userInfo)
        }).then(data => data.json().then(
            response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.setState({redirectToReferer: true});
            }
        )).catch(error => {
            Alert.error((error && error.message))
        });

        // then(data => console.log(data));


        console.log(this.state.data);

        this.props.auth.authenticate(() => {
            this.setState(({
                redirectToReferer: true,
            }))
        });
        console.log("Logged in!");
    };

    handleInput = (event) => {

        const {name, value} = event.target;
        if (name === 'email'){
            this.setState(prevState => {
                prevState.userInfo.email = value;
            return prevState
            });
        } else if (name === 'password'){
            this.setState(prevState => {
                prevState.userInfo.password = value;
                return prevState
            });
        }
    };

    render() {
        console.log(this.state);

        if (this.state.redirectToReferer) {
            console.log("Redirect");
            // return <Redirect to='/main' />
        }

        return (
            <div>
                <p>You must log in to view the page</p>

                <input name='email' type='text' value={this.state.login} onChange={event => this.handleInput(event)}/>
                <input name='password' type='password' value={this.state.password} onChange={event => this.handleInput(event)}/>
                <button onClick={this.login}>Log in</button>
                <button onClick={() => console.log(this.state.userInfo)}>LOG</button>
                <button onClick={() => console.log(localStorage.getItem(ACCESS_TOKEN))}>LOGTOKEN</button>
            </div>
        )
    }
}

export default LoginPage;
