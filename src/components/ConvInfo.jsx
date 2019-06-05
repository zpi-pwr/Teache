import React, {Component} from "react"
import {ADD_USER_TO_CONV, GET_ME2, getConversationGql} from '../queries/gql'
import {compose, graphql} from 'react-apollo'
import {COIN_IMAGE, DEFAULT_CONV_IMAGE} from "../constraints";
import styled from 'styled-components'
import METAMASK from "../assets/sendToken.png"

const UsersContainer = styled.div`
    max-height: 35vh;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.0);
        border-radius: 10px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.0);
        background-color: #555;
      }
`

const UserEntry = styled.div`
    display: flex;
    align-items: center;
    items-align: center;
    margin-top: 4px;
    padding: 8px 4px 8px 4px;
    font-size: 1.2rem;
    position: relative;
    z-index: 1;

    transition: opacity 250ms ease-in;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        border-radius: 8px;
        opacity: .05;
        z-index: -1;

        transition: opacity 250ms ease-out;
    }

    &:hover::before {
        opacity: 0.15;
    }

    font-size: 1.2rem;

    & > .user-avatar {
        width: 64px;
        height: auto;
        border-radius: 32px;
    }

    & > .user-nickname {
        height: 100%;
        display: inline;
        margin-left: 16px;
    }

    & > .wallet-image-container {
        width: 100%;
        text-align: justify;
        position: relative;

        &::before {
            content: "User can receive coins!";
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 140%;
            z-index: 9999;
            height: 32px;
            opacity: 0;
            padding: 2px 3px 2px 3px;

            transition: 
                opacity 250ms ease-in,
                background-color 200ms ease-out,
                transform 200ms ease-out;
        }

        &:hover::before {
            transform: translateX(-50%);
            background-color: black;
            border-radius: 7px;
            opacity: 0.7;
        }

        & >.user-wallet {
            float: right;
            width: 32px;
            height: auto;
            position: relative;
            margin-right: 8px;
        }
    }
`

class ConvInfo extends Component {
    constructor(props) {
        super(props);
        const {adverts} = this.props;
        this.state = {
            inputInvite: '',
        };
    }

    changeInputInvite(event) {
        const {value} = event.target;
        this.setState({
            inputInvite: value
        });
    }

    onAddUser = (event) => {
        const invitedUserNick = this.state.inputInvite;
        console.log(invitedUserNick);
        if (invitedUserNick && invitedUserNick !== '') {
            this.setState({
                inputInvite: ''
            });
            this.props.addUserToConv({
                variables: {
                    nickname: invitedUserNick,
                    id_conv: this.props.activeConv
                }
            });
        }
    };

    render() {
        return (<div style={{textAlign: "center"}}>
            <div><img style={{borderRadius: "50px", marginTop: "15px", marginBottom: "15px"}}
                      src={this.props.data.conversation ? this.props.data.conversation.avatarUrl || DEFAULT_CONV_IMAGE : DEFAULT_CONV_IMAGE}
                      height="50px" width="50px" alt='conv-avatar'/></div>
            <h3>{this.props.data.conversation ? this.props.data.conversation.name : ''}</h3>
            {/*<div style={{width: "100%"}}>Contributors:</div>*/}
            <UsersContainer>{this.props.data.conversation
                ? this.props.data.conversation.contributors.map(c =>
                    <UserEntry>
                        <img className='user-avatar' src={c.avatarUrl} alt='avatar' />
                        <div className='user-nickname'>{c.nickname}</div>
                        <div className='wallet-image-container'>
                            {c.ethWallet ? 
                            (
                                <img className='user-wallet' src={METAMASK} alt='wallet' />
                            ) : (null)}
                        </div>
                    </UserEntry>)
                : null}
            </UsersContainer>
            <input type="text"
                   value={this.state.inputInvite}
                   onChange={event => this.changeInputInvite(event)}
            />
            <button onClick={() => this.onAddUser()}><span role='img'>➕</span></button>
            <span style={{marginTop: "20px"}}>

               <div style={{position: 'fixed',
                   bottom: '100px'}}> <h4 style={{marginTop: "20px"}}>
            Create Advert
        </h4>
                <input type="text"
                       size="27"
                       style={{margin: '6px'}}
                       onChange={event => this.changeInputInvite(event)}
                />
                <textarea
                    style={{margin: '6px'}}
                    rows="3"
                    cols="25"
                    onChange={event => this.changeInputInvite(event)}
                /><br/>
                <button>Create</button>
               </div>
            </span>

        </div>)
    }
}

export default compose(graphql(getConversationGql, {
        options: (props) => ({
            variables: {
                activeConversation: props.activeConv
            }
        })
    }),
    graphql(ADD_USER_TO_CONV, {
        name: 'addUserToConv'
    }))(ConvInfo);
