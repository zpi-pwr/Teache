import React, {Component} from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import '../styles/MainPage.scss'
import Logo from '../assets/TLogo_cut.png'


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMessage: '',
            activeConversation: this.props.onConversationChange(834),
            groups: this.props.getConversationsHeads(),
            mainItemActive: false,

        };
    }

    handleSend(){
        if (this.state.inputMessage) {
            this.setState(prevState => {
                // const id = prevState.messages[prevState.messages.length - 1] + 1;
                prevState.activeConversation.messages.push({
                    // id: id,
                    message: prevState.inputMessage,
                    id_sender: 154
                });
                prevState.inputMessage = '';
                return prevState
            });
        }
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.handleSend();
        }
    };

    handleChangeInput(event){
        const {value} = event.target;
        this.setState({
            inputMessage: value
        });

    }

    openMainItem = () => {
        this.setState({mainItemActive: true})
    };


    groupChanged = (id) => {
        console.log("group changed: ", id);
        const conv = this.props.onConversationChange(id);
        this.setState({
            activeConversation: conv
        });

        // this.props.onConversationChange(id)
    };


    render() {
        const messagesList = this.state.activeConversation.messages.map(message =>
            <div key={message.id}>{message.message}</div>);

        const groupsCompList =
            this.state.groups.map(chat =>
                <ChatGroup
                    key={chat.id}
                    id={chat.id}
                    url={chat.avatar}
                    handleClick={this.groupChanged}
                    active={chat.id === this.state.activeConversation.id}/>);

        return (
            <div id='chat-body'
                 style={{backgroundImage: `url(${bgPic})`}}>
                <div className='main-container'>
                    <div id='groups'>
                        <ChatGroup id='main' url={Logo} handleClick={this.openMainItem}/>
                        {groupsCompList}

                    </div>
                    <div id='chat'>
                        <div className='chat-head'>

                            <h3>{this.state.activeConversation.name}</h3>


                            <div className='send-form'>

                            </div>

                        </div>
                        <div className='messages' id='mess' ref={(node) => { this.node = node; }}>
                                {messagesList}
                        </div>

                        <div className='send-form'>
                            <input
                                value={this.state.inputMessage}
                                type='text'
                                onChange={event => this.handleChangeInput(event)}
                                onKeyPress={this.handleKeyPress}
                                className='form-control'/>
                            <img src={Photo} alt='uploadPh'/>
                            <img src={File} alt='file'/>
                            <img src={Send} alt='send'
                                 onClick={() => this.handleSend()}/>
                        </div>
                    </div>
                    <div id='details'>
                        {/*DETAILS*/}
                        {/*{this.state.inputMessage}*/}
                    </div>
                </div>
            </div>
    )
    }
}

export default MainPage;
