import React, {Component} from "react"
import {ADD_USER_TO_CONV, GET_ME2, getConversationGql} from '../queries/gql'
import {compose, graphql} from 'react-apollo'
import {COIN_IMAGE, DEFAULT_CONV_IMAGE} from "../constraints";


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
                      height="50px" width="50px"/></div>
            <h3>{this.props.data.conversation ? this.props.data.conversation.name : ''}</h3>
            {/*<div style={{width: "100%"}}>Contributors:</div>*/}
            <div>{this.props.data.conversation
                ? this.props.data.conversation.contributors.map(c =>
                    <div>
                        {c.nickname}
                        <img style={{marginLeft: "8px"}} src={COIN_IMAGE} width="15px" height="15px"/>
                    </div>)
                : ''}
            </div>
            <input type="text"
                   value={this.state.inputInvite}
                   onChange={event => this.changeInputInvite(event)}
            />
            <button onClick={() => this.onAddUser()}>➕</button>
            <span style={{marginTop: "20px"}}>

               <div style={{position: 'fixed',
                   bottom: '100px'}}> <h4 style={{marginTop: "20px"}}>
            Create Advert
        </h4>
                <input type="text"
                       size="27"
                       style={{margin: '6px'}}
                       value={this.state.inputInvite}
                       onChange={event => this.changeInputInvite(event)}
                />
                <textarea
                    style={{margin: '6px'}}
                    rows="3"
                    cols="25"
                    value={this.state.inputInvite}
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
