import React, {Component} from "react"
import {NavLink} from "react-router-dom"
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

class Navigation extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

        };
    }

    render() {
        return (

                <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top">
                    <NavLink to="/index" className="navbar-brand">My Website</NavLink>
                    <button
                        type="button"
                        className="navbar-toggler collapsed"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-expanded="false">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-item">
                                <NavLink to="/account" className="nav-link">Account</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink to="/search" className="nav-link">Search</NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
        )
    }
}


export default Navigation
