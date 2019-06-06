import React, {Component} from "react"
import Register from "./Register";
import {Redirect} from "react-router-dom";
import { userService } from "../service/userService";
import {connect} from "react-redux";
import '../styles/LandingPage.scss'
import '../styles/LandingPage.css'
import MediaQuery from 'react-responsive'

const element = {color: '#543F44', fontsize: 5}

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registerOpen: true,
            name: 'my name',
            email: 'emil',
            password: 'passwd',
            passwordCheck: '1234',
            redirectToLogin: false
        }
    }

    handleInput = (event) => {
        switch (event.target.id) {
            case 'register-btn':
                console.log("register-btn clicked!'");
                this.setState(prevState => {
                    return {
                        registerOpen: !prevState.registerOpen
                    }
                });
                break;
            default:
                console.log("Click uncaught from " + event.target)
        }
    };

    formHandler = (event) => {
        const {name, value} = event.target;
        console.log(event.target.value);
        this.setState({
                [name]: value
            }
        );

    };

    register = () => {
        if(this.state.name && this.validateEmail(this.state.email) && this.state.password === this.state.passwordCheck){
            const registerBody = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            };
            
            const { dispatch } = this.props;

            dispatch(userService.register(registerBody));
            this.setState({ redirectToLogin: true })
        }
    };

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        if(this.state.redirectToLogin)
            return <Redirect to={{pathname: '/login'}} />

        return (
            <div className="cont"
                  style={{overflow: 'hidden'}}>
                {/*<img height='920px' src={landingPic} alt="book on the desk"/>*/}
                <div className="text-center"
                     style={{
                         position: "absolute",
                         top: "20%",
                         left: '50%',
                         right: '10%',
                         transform: 'translate(-50%, -50%)'
                     }}>
                    <h1 style={element} className="header">Teach and learn the world around you on Teache</h1>
                    <br></br>
                    <button
                        id='register-btn'
                        onClick={(event) => this.handleInput(event)}
                        className="btn btn-success">
                        JOIN US
                    </button>
                </div>
                <div className="createAcc"
                     style={{
                         overflow: "auto",
                         position: "absolute",
                         top: "65%",
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                     }}>
                    {this.state.registerOpen ?
                        <Register
                            nameVal={this.state.name}
                            emailVal={this.state.email}
                            passwordVal={this.state.password}
                            passwordCheckVal={this.state.passwordCheck}
                            handleInput={this.formHandler}
                            register={this.register}
                            mobileDevice={false}
                        />
                        : null}
                </div>
            </div>
        )
    }
}

export default LandingPage = connect()(LandingPage);

