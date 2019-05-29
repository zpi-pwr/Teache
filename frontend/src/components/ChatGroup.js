import React from "react"
import styled from 'styled-components'

const DEFAULT_CONV_IMAGE = "https://cdn.mantelligence.com/wp-content/uploads/2017/11/weird-conversation-starters.png";


const Item = styled.div`
    padding: 6px;
    &:hover {
        background-color: rgba(46, 21, 27, 0.4);
      }
    div {
        display: inline;
    }`;

const Avatar = styled.img`
        padding-left: 0px;
        height: 60px;
        width: 60px;
        border-radius: 50px;`;

function ChatGroup(props) {
    const activeStyle = {
        backgroundColor: '#2E151B',
    };
    const inactiveStyle = {};
    return (
        <Item
            onClick={() => props.handleClick(props.id)}
            style={props.active ? activeStyle : inactiveStyle}>
            <Avatar className='avatar' src={props.url || DEFAULT_CONV_IMAGE} alt='avatar'/>
            <div style={{"paddingLeft": "6px"}}>{props.name}</div>
        </Item>
    )
}

export default ChatGroup;
