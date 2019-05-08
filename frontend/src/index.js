import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.css';
import './styles/bootstrap.min.css'
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import {ApolloProvider} from "react-apollo";
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App style={{height: '100%'}}/>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
