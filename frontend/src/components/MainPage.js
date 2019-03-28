import React, {Component} from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import '../styles/MainPage.scss'
import Message from './Message'
import Logo from '../assets/TLogo_cut.png'

import SockJsClient from 'react-stomp'
import {connect} from "react-redux";
import GroupsComponent from "./GroupsComponent";
import ChatComponent from "./ChatComponent";

const styleOptCollapsed = {
    gridTemplateColumns: '72px auto',
};

const styleOptUnCollapsed = {
    gridTemplateColumns: '72px auto 320px',
};

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMessage: '',
            activeConversation: 0,
            conversations: this.props.activeConversation,
            groups: this.props.groups,
            mainItemActive: false,
            width: 0,
            isCollapsed: false,
            userID: 154,
            // stompClient: new SockJsClient('/ws')

        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillMount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    connectToChat(event) {
        let username = 'Monteth';
    }

    updateWindowDimensions() {
        const w = window.innerWidth;
        this.setState({width: w});
        this.state.isCollapsed = w <= 960;
    }

    handleSend() {
        if (this.state.inputMessage) {
            console.log('send message')
            this.setState(prevState => {
                prevState.inputMessage = '';
                return prevState
            });
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSend();
        }
    };

    handleChangeInput(event) {
        const {value} = event.target;
        this.setState({
            inputMessage: value
        });
        console.log("input")
    }

    openMainItem = () => {
        this.setState({mainItemActive: true, activeConversation: null});
        console.log("Open Main Item")
    };


    groupChanged = (id) => {
        console.log("group changed: ", id);
        // const conv = this.props.onConversationChange(id);
        this.setState({
            activeConversation: id,
            mainItemActive: false
        });
        // this.props.onConversationChange(id)
    };

    showDetails = (id) => {
        console.log(id);
    };


    render() {
        const messagesList = this.state.conversations[0].messages.map(message =>
            <Message
                message={message.inputMessage}
                id={message.id}
                key={message.id}
                handleOver={this.showDetails}
                isActive={message.id_sender === this.state.userID}/>);

        const groupsCompList =
            this.state.groups.map(chat =>
                <ChatGroup
                    key={chat.id}
                    id={chat.id}
                    url={chat.avatar}
                    onClick={this.groupChanged}
                    active={chat.id === this.state.activeConversation}/>);

        return (
            <div id='chat-body'
                 style={{backgroundImage: `url(${bgPic})`}}>
                <div className='main-container'
                     style={this.state.isCollapsed ? styleOptCollapsed : styleOptUnCollapsed}>
                    <GroupsComponent
                        mainItemActive={this.state.mainItemActive}
                        openMainItem={this.openMainItem}
                        list={groupsCompList}/>

                    <ChatComponent
                        conversationName={this.state.conversations[0].name}
                        messages={messagesList}
                        inputMessage={this.state.inputMessage}
                        onChange={event => this.handleChangeInput(event)}
                        onKeyPress={this.handleKeyPress}
                        onClick={() => this.handleSend()}/>
                    {!this.state.isCollapsed ? <div id='details'/> : null}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {activeConversation, groups} = state.chatReducer;
    // console.log(`state ${state.chatReducer}`);
    // console.log(state.chatReducer.activeConversation);
    // console.log(state.chatReducer.groups);
    return {activeConversation, groups};
}

export default MainPage = connect(mapStateToProps)(MainPage);
