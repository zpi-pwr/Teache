import {Redirect, Route} from "react-router";
import React from "react";
import {ACCESS_TOKEN} from "../constraints";

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem(ACCESS_TOKEN)
            ? <Component {...props}/>
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>

);
