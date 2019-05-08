import React from "react"
import { GET_ME2, getConversationGql } from '../queries/gql'
import { graphql } from 'react-apollo'

function ConvInfo(props) {
    return (<div>
        <div>Conversation info: </div>
        <div>{props.data.conversation ? props.data.conversation.name : ''}</div>
        <div>Contributors: </div>
        <div>{props.data.conversation
            ? props.data.conversation.contributors.map(c =>
                <div>
                    {c.nickname} <button>Daj pieniążka</button>
                </div>)
            : ''}
        </div>
    </div>)
}

export default
    graphql(getConversationGql, {
        options: (props) => ({
            variables: {
                activeConversation: props.activeConv
            }
        })
    })(ConvInfo);