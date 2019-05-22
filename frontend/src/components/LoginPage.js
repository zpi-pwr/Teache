import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import {ACCESS_TOKEN} from "../constraints";
import {userService} from "../service/userService";
import {connect} from "react-redux";
import NavLink from "react-bootstrap/NavLink";
import Login from "./Login";

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
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <Login/>
                </div>
            </div>
        )
    }
}



export default LoginPage = connect()(LoginPage);
