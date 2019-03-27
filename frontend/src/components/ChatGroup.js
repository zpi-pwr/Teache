import React from "react"
import styled from 'styled-components'


const Item = styled.div`
    padding: 6px;
    &:hover {
        background-color: rgba(0, 188, 140, 0.7);
        border-radius: 40%;
      }`;

const Avatar = styled.img`
        border-radius: 40%;
        height: 60px;
        width: 60px;`

function ChatGroup(props) {
    const activeStyle = {
        backgroundColor: '#00bc8c',
        borderRadius: '40%',
    };
    const inactiveStyle = {};
    return (
        <Item
            onClick={() => props.onClick(props.id)}
            style={props.active ? activeStyle : inactiveStyle}>
            <Avatar className='avatar' src={props.url} alt='avatar'/>
        </Item>
    )
}

export default ChatGroup;
