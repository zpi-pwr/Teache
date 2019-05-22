import React, { Component } from "react"
import ChatGroup from "./ChatGroup";
import Logo from '../assets/TLogo_cut.png'
import styled from 'styled-components'

const GroupsParent = styled.div`
    background-color: rgba(46, 21, 27, 0.5);
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 120px);
    overflow-y: auto;
`;

class GroupsComponent extends Component {
    render() {
        return (
            <GroupsParent>
                {/*<div style={{overflow: ""}}>*/}
                <ChatGroup
                    name="TEACHE"
                    url={Logo}
                    handleClick={this.props.openMainItem}
                    active={this.props.mainItemActive}
                />
                {this.props.list}
                {/*</div>*/}
            </GroupsParent>)
    }
}

export default GroupsComponent
