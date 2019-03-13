import React, {Component} from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import TLogo from '../assets/TLogo_cut.png'
import '../styles/MainPage.scss'


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groups: [
                { id: 345, url: 'https://randomuser.me/api/portraits/med/women/21.jpg'},
                { id: 243, url: 'https://randomuser.me/api/portraits/med/men/56.jpg'},
                { id: 834, url: 'https://randomuser.me/api/portraits/med/men/47.jpg'},
                { id: 153, url: 'https://randomuser.me/api/portraits/med/women/96.jpg'},
                { id: 152, url: 'https://randomuser.me/api/portraits/med/women/79.jpg'}
            ],
            nrOfGroups: 4,
            activeGroup: 834,
        };
        // this.groupChanged = this.groupChanged.bind(this)
    }

    groupChanged = (id) => {
        this.setState(prevState => {
            return prevState.activeGroup = id
        })
    }



    render() {
        const groupsCompList =
            this.state.groups.map(chat =>
                <ChatGroup
                    id={chat.id}
                    url={chat.url}
                    handleClick={this.groupChanged}
                    active={chat.id === this.state.activeGroup}
                />);

        return (
            <div id='chat-body'
            style={{backgroundImage: `url(${bgPic})`}}>
                <div className='main-container'>
                    <div id='groups' >
                        {/*<ChatGroup url={TLogo} />*/}
                        {groupsCompList}

                    </div>
                    <div id='chat'>
                        <div id='chat-head'>
                            <div className='name'>
                                <h3>Hannah Reed</h3>
                            </div>

                            <div className='send-form'>

                            </div>

                        </div>
                        <div className='messages'>
                            Chat
                        </div>
                        <div className='send-form'>
                            Send form
                        </div>
                    </div>
                    <div id='details'>

                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage;
