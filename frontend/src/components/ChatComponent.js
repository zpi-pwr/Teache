import React, {Component} from "react"
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import SendToken from "../assets/sendToken.png"
import styled from 'styled-components'
import {Messages} from "../data/Messages";
import { graphql } from 'react-apollo'
import { GET_ME, getConversationGql } from '../queries/gql'
import * as ReactDOM from "react-dom";

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
      height: 75vh;`;

const SendForm = styled.div`
      display: grid;
      grid-template-columns: auto repeat(4, 42px);
      background-color: rgba(46, 21, 27, 0.9);
      align-items: center;
      justify-items: center;`;
const FormImg = styled.img`
      width: 30px;
      height: 30px;
      &:hover {
        width: 34px;
        height: 34px;
      }`;

class ChatComponent extends Component {

    constructor() {
        super()

        this.state = {
            tokenFormVisible: false
        }
    }

    scrollToBottom()
    {
        this.node.scrollTop = this.node.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const name = this.props.data.conversation ? this.props.data.conversation.name : "";
        return (
            <Chat id='chat'>
                <Head className='chat-head'>
                    <h3>{name}</h3>
                </Head>
                <MessagesContainer ref={(node) => {this.node = node;}}>
                    {/* {Messages(this.props.userId, this.props.handleOver)} */}
                    {this.props.messages}
                </MessagesContainer>    
                <SendForm className='send-form'>
                    <input
                        value={this.props.inputMessage}
                        type='text'
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        className='form-control'/>
                    <FormImg src={SendToken} alt="sendToken" onClick={this.props.onSendToken} />
                    <FormImg src={Photo} alt='uploadPh'/>
                    <FormImg src={File} alt='file'/>
                    <FormImg src={Send} alt='send'
                         onClick={this.props.onClick}/>
                </SendForm>


            </Chat>)
    }
}



export default 
    graphql(getConversationGql, {
        options: (props) => ({
            variables: {
                activeConversation: props.conversationID
            }
        })
    })
(ChatComponent);
