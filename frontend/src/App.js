import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch, } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
import AccountPage from "./components/AccountPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import {PrivateRoute} from "./components/PrivateRoute";
import {LogoutPage} from "./components/LogoutPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeConversation: 0
            // conversations: loadConversations()
        };
    }

    changeConversation = (newId) => {
        this.setState({activeConversation: newId})
    }


    render() {
        return (
            <BrowserRouter style={{height: '100%'}}>
                <div style={{height: '100%'}}>
                    {/*<Navigation/>*/}
                    <Switch className="bg-dark" style={{height: '100%'}}>
                        <Route path="/" component={LandingPage} exact/>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/logout" exact component={LogoutPage}/>
                        <PrivateRoute path="/index" exact
                                      component={MainPage}/>
                        <PrivateRoute path="/main" exact
                                      component={MainPage}/>
                        <PrivateRoute path="/search" component={SearchPage} exact/>
                        <PrivateRoute path="/account" component={AccountPage} exact/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
