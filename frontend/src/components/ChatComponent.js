import React, {Component} from "react"
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import styled from 'styled-components'


const Chat = styled.div`
    display: grid;
    grid-template-rows: 72px auto 42px;
    row-gap: 5px;`;

const Head = styled.div`
    background-color: #1b2d40;
    h3 {
        text-align: center;
        padding-top: 15px;
        color: #CFD8DC;
    }`;

const MessagesContainer = styled.div`
      padding: 10px;
      background-color: rgba(96,125,139,0.8);
      //opacity: 0.9;
      align-items: flex-end;
      vertical-align: bottom;
      overflow-x: hidden;
      overflow-y: scroll;
      height: 700px;`;

const SendForm = styled.div`
      display: grid;
      grid-template-columns: auto repeat(3, 42px);
      background-color: #232323;
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
    render() {
        return (
            <Chat id='chat'>
                <Head className='chat-head'>
                    <h3>{this.props.conversationName}</h3>
                </Head>
                <MessagesContainer ref={(node) => {this.node = node;}}>
                    {this.props.messages}
                </MessagesContainer>
                <SendForm className='send-form'>
                    <input
                        value={this.props.inputMessage}
                        type='text'
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        className='form-control'/>
                    <FormImg src={Photo} alt='uploadPh'/>
                    <FormImg src={File} alt='file'/>
                    <FormImg src={Send} alt='send'
                         onClick={this.props.onClick}/>
                </SendForm>
            </Chat>)
    }
}

export default ChatComponent