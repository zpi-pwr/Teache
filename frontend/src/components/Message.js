import React from 'react'
import styled from 'styled-components'


const MyMessage = styled.div`
        display: inline;
        border-radius: 10px;
        padding: 4px;
        background-color: #00cec9;
        float: right;
        margin: 3px;
        clear: both;
        max-width: 70%;`;
const FriendMessage = styled.div`
        display: inline;
        border-radius: 10px;
        padding: 4px;
        background-color: #00bc8c;
        float: left;
        margin: 3px;
        clear: both;
        max-width: 70%;`;

function Message(props) {

    return props.isActive
        ? <MyMessage onMouseOver={() => props.handleOver(props.id)}>{props.message}</MyMessage>
        : <FriendMessage onMouseOver={() => props.handleOver(props.id)}>{props.message}</FriendMessage>
}

export default Message
