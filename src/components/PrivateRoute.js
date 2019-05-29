import {Redirect, Route} from "react-router";
import React from "react";
import {TOKEN_SPRING} from "../constraints";

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem(TOKEN_SPRING)
            ? <Component {...props}/>
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>

);
