import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import {TOKEN_SPRING} from "../constraints";
import {userService} from "../service/userService";
import {connect} from "react-redux";
import NavLink from "react-bootstrap/NavLink";
import Link from "react-router-dom/es/Link";

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

                <div
                    style={{
                        position: "absolute",
                        top: "55%",
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                    <div className="card bg-light" style={{width: '400px', opacity: '0.92'}}>
                        <article className="card-body mx-auto" style={{maxwidth: '400px'}}>
                            <h4 className="card-title mt-3 text-center">Log Into Teache!</h4>
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user"/> </span>
                                    </div>
                                    <input
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="E-mail"
                                        type="email"
                                        onChange={(event) => this.handleInput(event)}/>
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-envelope"/> </span>
                                    </div>
                                    <input
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Password"
                                        type="password"
                                        onChange={(event) => this.handleInput(event)}/>
                                </div>
                                <div className="form-group">
                                    <button onClick={() => this.login()} type="button" className="btn btn-primary btn-block">Log in</button>
                                </div>
                                <p className="text-center">
                                    Don't have an account? <Link to="/">Sign up now!</Link>
                                </p>
                            </form>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}



export default LoginPage = connect()(LoginPage);
