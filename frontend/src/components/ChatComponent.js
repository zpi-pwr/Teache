import React, {Component} from "react"
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'

class ChatComponent extends Component {
    render() {
        return (
            <div id='chat'>
                <div className='chat-head'>

                    <h3>{this.props.conversationName}</h3>

                    <div className='send-form'>

                    </div>

                </div>
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
            </div>)
    }
}

export default ChatComponent
