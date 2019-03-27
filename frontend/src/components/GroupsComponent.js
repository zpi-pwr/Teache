import React, {Component} from "react"
import ChatGroup from "./ChatGroup";
import Logo from '../assets/TLogo_cut.png'

class GroupsComponent extends Component {
    render() {
        return (
            <div id='groups'>
                <ChatGroup
                    url={Logo}
                    onClick={this.props.openMainItem}
                    active={this.props.mainItemActive}
                />
                {this.props.list}
            </div>)
    }
}

export default GroupsComponent
