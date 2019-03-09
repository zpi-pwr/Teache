import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
import AccountPage from "./components/AccountPage";
import LoginPage from "./components/LoginPage";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Navigation/>
                <Switch className="bg-dark">
                    <Route path="/" component={LandingPage} exact/>
                    <Route path="/index" component={LandingPage} exact/>
                    <Route path="/search" component={SearchPage} exact/>
                    <Route path="/login" component={LoginPage} exact/>
                    <Route path="/account" component={AccountPage} exact/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
