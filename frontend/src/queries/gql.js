import {gql} from 'apollo-boost'

export const getConversationGql = gql`
    query getConversation($activeConversation: ID!){
      conversation(id: $activeConversation){
        id
        name
        contributors {
          id
          nickname
        }
        ethWallet
        messages {
          id
          content
          sender{
            id
          }
          date
          tags
        }
      }
    }
`;

export const sendMessageGql = gql`
    mutation send($id_conv: ID!, $content: String!, $id_sender: ID!) {
        addMessage(id_conversation: $id_conv, content: $content, id_sender: $id_sender) {
            id
            content
        }
    }

`;

export const getMe = gql`
    query getMe($nickname: String!){
        me (nickname: $nickname){ 
            id 
            nickname 
            conversations{ 
                id 
                name 
                avatarUrl
            }
        }
    }
`;