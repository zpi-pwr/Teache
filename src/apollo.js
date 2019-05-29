import ApolloClient from 'apollo-boost'
import { EXPRESS_URL } from './constants'


export const apolloClient = new ApolloClient({
    uri: EXPRESS_URL + '/graphql'
});