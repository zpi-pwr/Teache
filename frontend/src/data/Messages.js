import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Message from "../components/Message";

export const Messages = (userid, details) => (
    <Query query={gql`
    {
      conversation(id: "5c98f6721c9d440000626e2e") {
        id
        name
        contributors {
          id
          nickname
        }
        messages {
          id
          content
          sender {
            id
          }
        }
      }
    }
    `}>
        {({loading, error, data}) => {
            if (loading) return <p>Good things take time....</p>;
            if (error) return <p>Something went wrong...</p>;
            console.log(data.conversation.messages);
            return data.conversation.messages.map(message =>
                <Message
                    message={message.content}
                    id={message.id}
                    key={message.id}
                    handleOver={details}
                    isActive={message.sender.id === userid}/>
            );
            // <div className="row">{console.log(data)}</div>
        }}
    </Query>);