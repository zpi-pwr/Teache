import styled from 'styled-components'
import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { apolloClient } from '../apollo'
import { GET_ME, getConversationGql } from '../queries/gql'
import { graphql } from 'react-apollo'
import UserInfo from './UserInfo'
import ConvInfo from './ConvInfo'

const Details = styled.div`
    display: inline-block;
    background-color: rgba(0, 137, 123, 0.8);`;

class DetailsComponent extends Component {

    getCostam() {
        const activeConversation = this.props.activeConv
        const data = apolloClient.query({
            query: getConversationGql,
            variables: {
                activeConversation
            }
        })

        return data.name
        // await result = client.query({ query: YOUR_QUERY, variables: { });
    }

    render() {
        const isMainActive = this.props.isMainActive;
        return (
            <Details>
                {isMainActive
                    ? <UserInfo userId={this.props.userId} />
                    : <ConvInfo activeConv={this.props.activeConv} />}
            </Details>)
    }
}

export default
    graphql(getConversationGql, {
        options: (props) => ({
            variables: {
                activeConversation: props.activeConv
            }
        })
    })(DetailsComponent);
