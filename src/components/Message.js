import React from 'react'
import styled from 'styled-components'

const FriendMessageT = styled.div`
    .date {
        font-size: 10px;
        color: #000000;
    }
    .content{
            font-size: 16px;
            color: rgb(103, 84, 89);
    }
    .tag {
        display: inline;
        font-size: 12px;
        font-style: italic;
        color: black;
    }
    overflow-wrap: break-word;
    border-radius: 6px;
    padding: 4px;
    margin: 6px;
    clear: both;
    max-width: 70%;
    min-width: 5%;
    
    & > img {
        width: 100%;
        height: auto;
    }
`


const MyMessageT = styled.div`
    .date {
        font-size: 10px;
        color: #ecf0f1;
    }
    .content{
            font-size: 16px;
    }
    .tag {
        display: inline;
        font-size: 12px;
        font-style: italic;
        color: white;
    }
    overflow-wrap: break-word;
    border-radius: 6px;
    padding: 4px;
    margin: 6px;
    clear: both;
    max-width: 70%;
    min-width: 5%;
    
    & > img {
        width: 100%;
        height: auto;
    }
`
const MyMessage = styled(MyMessageT)`
    background-color: rgba(103, 84, 89, 0.7);
    float: right;
    text-align: right;
`

const FriendMessage = styled(FriendMessageT)`
    background-color: rgba(232, 220, 204, 0.75);
    float: left;
    text-align: left;
`

const MessageInfo = styled.div`
    color: rgb(93, 74, 79);
    align-items: center;
    display: flex;
    justify-content: ${props => props.pos === 'left' ? 'flex-start' : 'flex-end'};
    margin-bottom: 3px;
    width: 100%;
    & > .user-avatar {
        width: 20px
        height: 20px;
        border-radius: 10px;
        margin: 0px 3px 0px 3px;
    }
`

function isImageMessage(message) {
    return /^(<input *type="image" *src="[A-Za-z0-9.:\-@#$%^&=?&/]*" *\/>)$/.test(message);
}

function parseMessageContent(content) {
    if (isImageMessage(content)) {
        let imageLink = content.match(/src=".*"/g);

        if (imageLink == null)
            return null;

        imageLink += '';
        imageLink = imageLink.slice(5, imageLink.length - 1)

        return (
            <img className="content" src={imageLink} alt="conv-img"/>
        )
    } else {
        return (
            <div className="content">{content}</div>
        )
    }
}

function Message(props) {
    // getMessageContent = () => {
    //         return props.isActive
    //             ? <MyMessage
    //                 // onMouseOver={() => props.handleOver(props.id)}
    //             >
    //                     <div className={"date"}>{dateStr}</div>
    //                     <div className={"content"}>{props.model.content}</div>
    //                     {props.model.tags ? props.model.tags.map(tag => <div className={"tag"}>{`#${tag} `}</div>) : []}
    //             </MyMessage>
    //             : <FriendMessage
    //                 // onMouseOver={() => props.handleOver(props.id)}
    //             >
    //                     <div className={"date"}>{dateStr}</div>
    //                     <div className={"content"}>{props.model.content}</div>
    //                     {props.model.tags ? props.model.tags.map(tag => <div className={"tag"}>{`#${tag}`}</div>) : []}
    //             </FriendMessage>
    // };

    const dt = new Date(props.model.date);
    const dateStr = `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`;

    return props.isActive
        ? <MyMessage
            // onMouseOver={() => props.handleOver(props.id)}
        >
            {/*<div className={"date"}>{dateStr}</div>*/}
            {parseMessageContent(props.model.content)}
            {props.model.tags ? props.model.tags.map(tag => <div className={"tag"}>{`#${tag} `}</div>) : []}
        </MyMessage>
        : <FriendMessage
            // onMouseOver={() => props.handleOver(props.id)}
        >
            {/*<div className={"date"}>{dateStr}</div>*/}
            {props.showNickname ? (
                <MessageInfo pos='left'>
                    <img className='user-avatar' src={props.model.sender.avatarUrl ? props.model.sender.avatarUrl : 'https://i.pravatar.cc/150?u=' + props.model.sender.nickname} alt=''/>
                    <div className='user-nickname'>{props.model.sender.nickname}</div>
                </MessageInfo>
            ) : []}
            {parseMessageContent(props.model.content)}
            {props.model.tags ? props.model.tags.map(tag => <div className={"tag"}>{`#${tag}`}</div>) : []}
        </FriendMessage>
}

export default Message
