import React, {Component} from "react"
import ChatGroup from "./ChatGroup";
import Logo from '../assets/TLogo_cut.png'
import styled from 'styled-components'

const Groups = styled.div`
    background-color: #1b2d40;
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 120px);
    text-align: center;

`;

class GroupsComponent extends Component {
    render() {
        return (
            <Groups>
                <ChatGroup
                    url={Logo}
                    onClick={this.props.openMainItem}
                    active={this.props.mainItemActive}
                />
                {this.props.list}
            </Groups>)
    }
}

export default GroupsComponent
