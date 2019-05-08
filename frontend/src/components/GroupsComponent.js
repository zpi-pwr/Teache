import React, {Component} from "react"
import ChatGroup from "./ChatGroup";
import Logo from '../assets/TLogo_cut.png'
import styled from 'styled-components'

const GroupsParent = styled.div`
    background-color: #1b2d40;
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 120px);
    text-align: center;
    overflow-y: auto;
`;

class GroupsComponent extends Component {
    render() {
        return (
            <GroupsParent>
                {/*<div style={{overflow: ""}}>*/}
                    <ChatGroup
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
