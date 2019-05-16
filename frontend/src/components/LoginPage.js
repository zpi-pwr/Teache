import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import {TOKEN_SPRING} from "../constraints";
import {userService} from "../service/userService";
import {connect} from "react-redux";

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
        const {dispatch } = this.props;
        dispatch(userService.login(this.state.userInfo.email, this.state.userInfo.password));
        this.setState({redirectToReferer: true});
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

        return (
            <div>
                {this.state.redirectToReferer? <Redirect to={{pathname: '/index'}}/> : null}
                <p>You must log in to view the page</p>

                <input name='email' type='text' value={this.state.login} onChange={event => this.handleInput(event)}/>
                <input name='password' type='password' value={this.state.password} onChange={event => this.handleInput(event)}/>
                <button onClick={this.login}>Log in</button>
                <button onClick={() => console.log(this.state.userInfo)}>LOG</button>
                <button onClick={() => console.log(localStorage.getItem(TOKEN_SPRING))}>LOG TOKEN</button>
                <button onClick={() => console.log(localStorage.removeItem(TOKEN_SPRING))}>CLEAR TOKEN</button>
            </div>
        )
    }
}



export default LoginPage = connect()(LoginPage);
