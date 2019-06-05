import React, {Component} from "react"
import {ADD_USER_TO_CONV, GET_ME2, getConversationGql} from '../queries/gql'
import {compose, graphql} from 'react-apollo'
import {COIN_IMAGE, DEFAULT_CONV_IMAGE} from "../constraints";
import styled from 'styled-components'
import METAMASK from "../assets/sendToken.png"

const MainContainer = styled.div`
    text-align: center;
    display: inline-block;
    height: 100%:
    overflow-y: scroll;
    overflow-x: hidden;

    & > #user-invite, #add-advert, #user-list {
        overflow: hidden;
        transition: 0.5s ease-out;
    }

    & > #user-invite {
        max-height: 100px;
    }

    & > #add-advert {
        max-height: 300px;
    }
    
    & > #user-list {
        max-height: 35vh;
    }

    & > #user-invite.invisible-box, 
        #user-list.invisible-box,
        #add-advert.invisible-box {
        max-height: 0px;
    }
    
    & > .action-btn, .action-btn-2 {
        display: flex;
        width: 100%;
        align-items: center;

        & > button {
            width: 100%;
            height: 32px;
            background: transparent;
            text-align: left;
            font-size: 1.3rem;
            border: none;
            margin-left: 8px;
            margin-top: 8px;
            color: white;
            outline: none;
        }

        & > div {
            float: right;
            margin-right: 8px;
            font-size: 2rem;
            font-weight: bold;
            transform: rotate(-90deg);
            transition: 250ms ease-out;
        }

        & > div.invisible-box {
            transform: rotate(0deg)
        }
    }
`

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

const UserInvite = styled.div`
    transition: display 250ms easy-out;

    &:before {
        content: 'Invite new user';
    }

    & > .invite-input {
        height: 36px;
        width: 80%;
        border-radius: 4px;
        border: transparent;
        outline: none;
        background: white;
        padding-left: 4px;
        padding-right: 4px;

        transition: border 150ms ease-out;
        
        &:focus, &:active {
            border: 1px solid black;
        }
    }

    & > .invite-btn {
        height: 36px;
        border-radius: 6px;
        margin-top: 8px;
        outline: none;

        &:active {
            border: 1px solid black;
        }
    }
`

const AdvertForm = styled.div`
`

class ConvInfo extends Component {
    constructor(props) {
        super(props);
        const {adverts} = this.props;
        this.state = {
            inputInvite: '',
            userListClass: '',
            inviteClass: 'invisible-box',
            addAdvertClass: 'invisible-box'
        };

        this.updateBtn = this.updateBtn.bind(this)
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

    updateBtn(e, target) {
        e.preventDefault()

        this.setState({
            [target]: this.state[target] ? 
                    (this.state[target] === '' ? 'invisible-box' : '')
                    : 'invisible-box'
        })
    }

    render() {
        return (<MainContainer id="dfq">
            <div><img style={{borderRadius: "75px", marginTop: "15px", marginBottom: "15px"}}
                      src={this.props.data.conversation ? this.props.data.conversation.avatarUrl || DEFAULT_CONV_IMAGE : DEFAULT_CONV_IMAGE}
                      height="150px" width="150px" alt='conv-avatar'/></div>
            <h3>{this.props.data.conversation ? this.props.data.conversation.name : ''}</h3>
            {/*<div style={{width: "100%"}}>Contributors:</div>*/}

            <div className='action-btn-2' onClick={e => this.updateBtn(e, 'userListClass')}>
                <button>Users in conversation</button>
                <div className={this.state.userListClass}>{'<'}</div>
            </div>

            <UsersContainer id='user-list' className={this.state.userListClass}>{this.props.data.conversation
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
            
            <div className='action-btn' onClick={e => this.updateBtn(e, 'inviteClass')}>
                <button>Invite user</button>
                <div className={this.state.inviteClass}>{'<'}</div>
            </div>
            
            <UserInvite id='user-invite' className={this.state.inviteClass}>
                <input type="text"
                className='invite-input'
                value={this.state.inputInvite}
                onChange={event => this.changeInputInvite(event)}
                placeholder='Username' />

                <button className='invite-btn' onClick={() => this.onAddUser()}>Send invite!</button>
            </UserInvite>

            <div className='action-btn' onClick={e => this.updateBtn(e, 'addAdvertClass')}>
                <button>Add advert</button>
                <div className={this.state.addAdvertClass}>{'<'}</div>
            </div>

            <AdvertForm id='add-advert' className={this.state.addAdvertClass}>
                <h4 style={{marginTop: "20px"}}>Create Advert</h4>
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
            </AdvertForm>

        </MainContainer>)
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
