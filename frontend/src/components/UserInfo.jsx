import React from "react"
import { GET_ME2, getConversationGql } from '../queries/gql'
import { graphql } from 'react-apollo'

function UserInfo(props) {
    return (<div>
        UserInfo: 
        {props.data.me2 ? props.data.me2.nickname : ''}
        </div>)
}

export default 
    graphql(GET_ME2, { 
        options: (props) => ({ 
            variables: { 
                id: props.userId
            } 
        })
    })( UserInfo );