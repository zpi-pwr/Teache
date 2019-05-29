import React, {Component} from "react"
import {TOKEN_EXPRESS, TOKEN_SPRING} from "../constraints";
import {Redirect} from "react-router";
import LandingPage from "./LandingPage";
import {userService} from "../service/userService";

export class LogoutPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        setTimeout(function() { //Start the timer
            this.setState({redirect: true}) //After 1 second, set render to true
        }.bind(this), 3000)
    }

    render() {
        return (
            <div>
                {userService.logout()}
                You're logged out!
                {this.state.redirect? <Redirect to={{pathname: '/'}}/> : null}
            </div>
        )
    }
}
