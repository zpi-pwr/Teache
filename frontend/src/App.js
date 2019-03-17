import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch, Link, Redirect, withRouter,} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
import AccountPage from "./components/AccountPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated
        ? <Component {...props}/>
        : <Redirect to={{
            pathname: '/login',
            state: {from: props.location}
            }}/>
    )}/>
);

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };
    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    };
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <p>You must log in to view the page</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}


class App extends Component {
  render() {
    return (
        <BrowserRouter style={{height: '100%'}}>
            <div style={{height: '100%'}}>
                <Navigation/>
                <Switch className="bg-dark" style={{height: '100%'}}>
                    <Route path="/" component={LandingPage} exact/>
                    <Route path="/index" component={LandingPage} exact/>
                    <Route exact
                        path="/login"
                        render={() => <LoginPage auth={fakeAuth}/>}
                    />
                    <PrivateRoute path="/main" component={MainPage} exact/>
                    <PrivateRoute path="/search" component={SearchPage} exact/>
                    <PrivateRoute path="/account" component={AccountPage} exact/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
