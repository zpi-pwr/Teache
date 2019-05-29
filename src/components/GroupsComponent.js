import React, {Component} from "react"
import ChatGroup from "./ChatGroup";
import Logo from '../assets/TLogo_cut.png'
import styled from 'styled-components'
import {compose, graphql, Query} from "react-apollo";
import {ADD_CONVERSATION} from "../queries/gql";


const GroupsParent = styled.div`
    background-color: rgba(46, 21, 27, 0.5);
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 120px);
    overflow-y: auto;
`;

class GroupsComponent extends Component {

    onAddConversation = () => {
        this.props.addConversation({
            variables: {
                conv_name: 'NewConversation',
            }
        });
        return 'xd'
    };

    render() {
        return (
            <GroupsParent>
                {/*<div style={{overflow: ""}}>*/}
                {/*<ChatGroup*/}
                {/*    name="TEACHE"*/}
                {/*    url={Logo}*/}
                {/*    handleClick={this.props.openMainItem}*/}
                {/*    active={this.props.mainItemActive}*/}
                {/*/>*/}
                <ChatGroup
                    name="ADD NEW GROUP"
                    id={'0'}
                    url={"https://primephotosevents.com/static/img/icon-plus-circled.svg"}
                    handleClick={this.onAddConversation}/>

                {this.props.list}
                {/*</div>*/}
            </GroupsParent>)
    }
}

export default compose(graphql(ADD_CONVERSATION, {name: 'addConversation'}))(GroupsComponent)
