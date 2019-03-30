import React, {Component} from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import Message from './Message'

import {connect} from "react-redux";
import GroupsComponent from "./GroupsComponent";
import ChatComponent from "./ChatComponent";
import styled from 'styled-components'
import {DetailsComponent} from "./DetailsComponent";

const Page = styled.div`
    width: 100%;
    height: 910px;
    background-image: url(${bgPic})`;

const Container = styled.div`
    position: absolute;
    top: 10%;
    left: 50%;
    width: 90%;
    height: 800px;
    transform: translate(-50%);
    display: grid;
    grid-gap: 10px;`;

const styleOptCollapsed = {
    gridTemplateColumns: '72px auto',
};

const styleOptUnCollapsed = {
    gridTemplateColumns: '72px auto 320px',
};

class MainPage extends Component {

    constructor(props) {
        super(props);
        const {conversations, groups} = this.props;
        this.state = {
            inputMessage: '',
            activeConversation: 0,
            conversations: conversations,
            groups: groups,
            mainItemActive: false,
            width: 0,
            isCollapsed: false,
            userID: 154,
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

    updateWindowDimensions() {
        const w = window.innerWidth;
        this.setState({
            width: w,
            isCollapsed: w <= 960
        });
    }

    handleSend() {
        const {inputMessage} = this.props;
        if (inputMessage) {
            console.log('send message');
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
        this.setState({
            activeConversation: id,
            mainItemActive: false
        });
    };

    showDetails = (id) => {
        console.log(id);
    };


    render() {
        const {
            conversations,
            userID,
            groups,
            activeConversation,
            isCollapsed,
            mainItemActive,
            inputMessage,
        } = this.state;

        const messagesList = conversations.length !== 0
            ? conversations[0].messages.map(message =>
                <Message
                    message={message.inputMessage}
                    id={message.id}
                    key={message.id}
                    handleOver={this.showDetails}
                    isActive={message.id_sender === userID}/>)
            : [];

        const groupsCompList =
            groups.map(chat =>
                <ChatGroup
                    key={chat.id}
                    id={chat.id}
                    url={chat.avatar}
                    onClick={this.groupChanged}
                    active={chat.id === activeConversation}/>);

        return (
            <Page>
                <Container
                    style={isCollapsed ? styleOptCollapsed : styleOptUnCollapsed}>
                    <GroupsComponent
                        mainItemActive={mainItemActive}
                        openMainItem={this.openMainItem}
                        list={groupsCompList}/>

                    <ChatComponent
                        conversationName={conversations[0].name}
                        messages={messagesList}
                        inputMessage={inputMessage}
                        onChange={event => this.handleChangeInput(event)}
                        onKeyPress={this.handleKeyPress}
                        onClick={() => this.handleSend()}/>
                    {!isCollapsed ? <DetailsComponent/> : null}
                </Container>
            </Page>
        )
    }
}

function mapStateToProps(state) {
    const {conversations, groups} = state.chatReducer;
    return {conversations, groups};
}

export default MainPage = connect(mapStateToProps)(MainPage);
