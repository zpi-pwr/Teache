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



class ChatComponent extends Component {
    render() {
        return (
            <Chat id='chat'>
                <Head className='chat-head'>

                    <h3>{this.props.conversationName}</h3>

                    <div className='send-form'>

                    </div>

                </Head>
                <div className='messages' id='mess' ref={(node) => {
                    this.node = node;
                }}>
                    {this.props.messages}
                </div>
                {/**/}
                <div className='send-form'>
                    <input
                        value={this.props.inputMessage}
                        type='text'
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        className='form-control'/>
                    <img src={Photo} alt='uploadPh'/>
                    <img src={File} alt='file'/>
                    <img src={Send} alt='send'
                         onClick={this.props.onClick}/>
                </div>
            </Chat>)
    }
}

export default ChatComponent
