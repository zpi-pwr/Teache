import React, {Component} from "react"
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import SendToken from "../assets/sendToken.png"
import styled from 'styled-components'
import {Messages} from "../data/Messages";
import {compose, graphql} from 'react-apollo'
import {GET_ME, getConversationGql} from '../queries/gql'
import * as ReactDOM from "react-dom";
import Message from "./Message";

const Chat = styled.div`
    display: grid;
    grid-template-rows: 72px auto 42px;
    row-gap: 5px;`;

const Head = styled.div`
    background-color: rgba(46, 21, 27, 0.9);
    h3 {
        text-align: center;
        padding-top: 15px;
        color: #CFD8DC;
    }`;

const MessagesContainer = styled.div`
      padding: 10px;
      background-color: rgba(255, 243, 230, 0.5);
      //opacity: 0.9;
      align-items: flex-end;
      //display: flex;
      //flex-direction: column-reverse;
      vertical-align: bottom;
      overflow-x: hidden;
      overflow-y: scroll;
      
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
      }
      
      `;

    

const SendForm = styled.div`
      display: flex;
      align-items: center;
      justify-items: center;
      background-color: rgba(46, 21, 27, 0.9);

      & > .form-control {
        margin: 8px 4px 8px 2px;
      }
`

const ActionButtons = styled.div`
      float: right;
      display: grid;
      grid-template-columns: auto repeat(2, 42px);
      align-items: center;
      justify-items: center;
`;

const FormImg = styled.img`
      width: 30px;
      height: 30px;
      &:hover {
        width: 34px;
        height: 34px;
      }`

const FileInput = styled.input`
      display: none;
    `

const FileInputLabel = styled.label`
    background-image: url(${Photo});
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: contain;
    width: 30px;
    height: 30px;
    &:hover {
        width: 34px;
        height: 34px;
    }`

class ChatComponent extends Component {

    constructor() {
        super()

        this.state = {
            tokenFormVisible: false
        }
    }

    scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    /*
    const data = this.props.data.converstation;
    const messages = data ? data.messages.map((message, index) => {

        let nickname = null;

        if(index < 1 || message.sender.id !== data.messages[index - 1].sender.id) {
            nickname = message.sender.nickname;
        }
        
        console.log('---')
        console.log(message)
        console.log()
        console.log(index)
        console.log('---')
        return (
            <Message
            key={index}
            model={message}
            isActive={message.sender.id === this.props.userId}
            user={nickname}>
        </Message>)
    } ) : [];
    return messages;
    */
    getMessages = () => {
        const data = this.props.data.conversation;
        const messages = data ? data.messages.map((message, index) => {

            let nickname = false;

            if(index < 1 || message.sender.id !== data.messages[index - 1].sender.id) {
                nickname = true;
            }

            return (
                <Message
                key={index}
                model={message}
                isActive={message.sender.id === this.props.userId}
                showNickname={nickname}>
            </Message>)
        } ) : [];
        return messages;
    }

    loadFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        this.props.sendImage(file);
    }

    render() {
        const name = this.props.data.conversation ? this.props.data.conversation.name : "";
        return (
            <Chat id='chat'>
                <Head className='chat-head'>
                    <h3>{name}</h3>
                </Head>
                <MessagesContainer ref={(node) => {
                    this.node = node;
                }}>
                    {/* {Messages(this.props.userId, this.props.handleOver)} */}
                    {this.getMessages()}
                </MessagesContainer>
                <SendForm className='send-form'>
                    <input
                        value={this.props.inputMessage}
                        type='text'
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        className='form-control'/>
                    <ActionButtons>
                        <FormImg src={SendToken} alt="sendToken" onClick={this.props.onSendToken}/>
                        <FileInput accept="image/*" type="file" size="50" name="file" id="file" onChange={(event) => this.loadFile(event)} />
                        <FileInputLabel for="file" />
                        <FormImg src={Send} alt='send'
                                onClick={this.props.onClick}/>
                    </ActionButtons>
                </SendForm>


            </Chat>)
    }
}


export default compose(graphql(getConversationGql, {
    options: (props) => ({
        variables: {
            activeConversation: props.conversationID
        },
        pollInterval: 100,
        fetchPolicy: "network-only"
    })
}))
(ChatComponent);
