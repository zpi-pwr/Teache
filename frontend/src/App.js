import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {BrowserRouter, Route, Switch, Link, Redirect, withRouter,} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import SearchPage from "./components/SearchPage";
import AccountPage from "./components/AccountPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import {ACCESS_TOKEN} from "./constraints";

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


const loadConversations = () => {
    return [
        {
            id: 345,
            name: "John Lennon",
            avatar: 'https://randomuser.me/api/portraits/med/men/56.jpg',
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
            ]
        },
        {
            id: 243,
            name: "Alisa",
            avatar: 'https://randomuser.me/api/portraits/med/women/21.jpg',
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Pa', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {id: 3, inputMessage: 'BlaBlaBla', id_sender: 154},
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
            ]
        },
        {
            id: 834,
            name: "Wiktor",
            avatar: 'https://randomuser.me/api/portraits/med/men/47.jpg',
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'No Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {id: 4, inputMessage: 'Lorem ipsum dolor sit amet', id_sender: 154},
            ]
        },
        {
            id: 153,
            name: "Julia",
            avatar: 'https://randomuser.me/api/portraits/med/women/96.jpg',
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 153
                },
            ]
        },
        {
            id: 152,
            name: "Best Friend",
            avatar: 'https://randomuser.me/api/portraits/med/women/79.jpg',
            messages: [
                {id: 0, inputMessage: 'Cześć!', id_sender: 154},
                {id: 1, inputMessage: 'Hej', id_sender: 463},
                {id: 2, inputMessage: 'Co u Ciebie?', id_sender: 154},
                {
                    id: 3,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
                {
                    id: 4,
                    inputMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.',
                    id_sender: 154
                },
            ]
        }
    ];
};


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem(ACCESS_TOKEN)
            ? <Component {...props}/>
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location},
                auth: {fakeAuth}
            }}/>
    )}/>
);


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: loadConversations()
        };
    }

    getConversationsHeads = () => {
        return this.state.conversations.map(fullConf => {
            return {id: fullConf.id, avatar: fullConf.avatar}
        });
    };

    getConversation = (id) => {
        for (let i = 0; i < this.state.conversations.length; i++) {
            if (this.state.conversations[i].id === id)
                return this.state.conversations[i]
        }
    };

    render() {
        return (
            <BrowserRouter style={{height: '100%'}}>
                <div style={{height: '100%'}}>
                    <Navigation/>
                    <Switch className="bg-dark" style={{height: '100%'}}>
                        <Route path="/" component={LandingPage} exact/>
                        <PrivateRoute path="/index" exact
                               render={() => <MainPage
                                   onConversationChange={this.getConversation}
                                   getConversationsHeads={this.getConversationsHeads}
                               />}/>
                        <Route exact
                               path="/login"
                               render={() => <LoginPage auth={fakeAuth}/>}
                        />
                        <PrivateRoute path="/main" exact
                                      render={() => <MainPage
                                          onConversationChange={this.getConversation}
                                          getConversationsHeads={this.getConversationsHeads}
                                      />}/>
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
