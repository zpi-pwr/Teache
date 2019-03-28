import React, {Component} from "react"
import {ACCESS_TOKEN} from "../constraints";
import {Redirect} from "react-router";
import LandingPage from "./LandingPage";

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
                {localStorage.removeItem(ACCESS_TOKEN)}
                You're logged out!
                {this.state.redirect? <Redirect to={{pathname: '/'}}/> : null}
            </div>
        )
    }
}
