import React, {Component} from "react"
import ChatGroup from "./ChatGroup";
import Logo from '../assets/TLogo_cut.png'
import styled from 'styled-components'
import {compose, graphql, Query} from "react-apollo";
import {ADD_CONVERSATION} from "../queries/gql";

const MainContainer = styled.div`
    display: flex-inline;
    height: 100%;
    overflow-y: hidden;
    align-content: space-between;
    position: relative;
`

const GroupsParent = styled.div`
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 120px);
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    margin: auto;
    background-color: rgba(46, 21, 27, 0.5);
`;
 
const ActionDivider = styled.div`
    width: 100%;
    height: 3px;
`

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
            <MainContainer>
                <ChatGroup 
                    name="ADVERTS"
                    url={Logo}
                    handleClick={this.props.openMainItem}
                    active={this.props.mainItemActive}
                    mainPageButton={true} />

                <ActionDivider />

                <GroupsParent>
                    {/* <div style={{overflow: ""}}> */}

                    <ChatGroup
                        name="ADD NEW GROUP"
                        id={'0'}
                        url={"https://primephotosevents.com/static/img/icon-plus-circled.svg"}
                        handleClick={this.onAddConversation}/>

                    {this.props.list}
                    {/*</div>*/}
                </GroupsParent>
            </MainContainer>)
    }
}

export default compose(graphql(ADD_CONVERSATION, {name: 'addConversation'}))(GroupsComponent)
