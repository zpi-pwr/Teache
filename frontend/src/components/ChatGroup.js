import React from "react"

function ChatGroup(props){
    const activeStyle = {
        backgroundColor: '#00bc8c',
        borderRadius: '40%',
    };
    const inactiveStyle = {

    };
        return (
            <div
                onClick={() => props.handleClick(props.id)}
                style={props.active ? activeStyle : inactiveStyle}>
                <img className='avatar' src={props.url} alt='avatar'/>
            </div>
        )
}

export default ChatGroup;
