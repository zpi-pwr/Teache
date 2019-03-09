import React, {Component} from "react"
import landingPic from '../assets/BookCover.jpeg'
import NavLink from "react-router-dom/es/NavLink";
import Register from "./Register";

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registerOpen: true
        }
    }

    handleInput(event) {
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
    }

    render() {
        return (
            <div>
                <img src={landingPic} alt="book on the desk"/>
                <div className="text-center"
                     style={{
                         position: "absolute",
                         top: "20%",
                         left: '50%',
                         transform: 'translate(-50%, -50%)'
                     }}>
                    <h1>Find your master</h1>
                    <button
                        id='register-btn'
                        onClick={(event) => this.handleInput(event)}
                        className="btn btn-success">
                        JOIN US
                    </button>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: "60%",
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                    {this.state.registerOpen ?
                        <Register/>
                        : null}
                </div>
            </div>
        )
    }
}

export default LandingPage;
