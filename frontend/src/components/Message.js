import React from 'react'
import styled from 'styled-components'



const MyMessage = styled.div`
        .date {
            font-size: 12px;
            color: #ecf0f1;
        }
        .content{
                font-size: 17px;
        }
        .tag {
            display: inline;
            font-size: 12px;
            font-style: italic;
            color: gray;
        }
        display: inline;
        border-radius: 10px;
        padding: 4px;
        background-color: #00cec9;
        float: right;
        margin: 3px;
        clear: both;
        max-width: 70%;`;
const FriendMessage = styled.div`
        .date {
            font-size: 12px;
            color: #ecf0f1;
        }
        .content{
                font-size: 17px;
        }
        .tag {
            display: inline;
            font-size: 12px;
            font-style: italic;
            color: gray;
        }
        display: inline;
        border-radius: 10px;
        padding: 4px;
        background-color: #00bc8c;
        float: left;
        margin: 3px;
        clear: both;
        max-width: 70%;`;


function Message(props) {
        const dt = new Date(props.model.date);
        const dateStr = `${dt.getHours()}:${dt.getMinutes()}`;
        return props.isActive
                ? <MyMessage
                // onMouseOver={() => props.handleOver(props.id)}
                >
                        <div className={"date"}>{dateStr}</div>
                        <div className={"content"}>{props.model.content}</div>
                        {props.model.tags ? props.model.tags.map(tag => <div className={"tag"}>{`#${tag} `}</div>) : []}
                </MyMessage>
                : <FriendMessage
                // onMouseOver={() => props.handleOver(props.id)}
                >
                        <div className={"date"}>{dateStr}</div>
                        <div className={"content"}>{props.model.content}</div>
                        {props.model.tags ? props.model.tags.map(tag => <div className={"tag"}>{`#${tag}`}</div>) : []}
                </FriendMessage>
}

export default Message
