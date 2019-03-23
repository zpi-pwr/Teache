import React, {Component} from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import Photo from '../assets/photo.png'
import Send from '../assets/send.png'
import File from '../assets/file.png'
import '../styles/MainPage.scss'


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nrOfGroups: 4,
            activeGroup: 834,
            message: 'piszę do ',
            messages: [
                {id: 0, message: 'Cześć!', id_sender: 154},
                {id: 1, message: 'Hej', id_sender: 463},
                {id: 2, message: 'Co u Ciebie?', id_sender: 154},
                {id: 3, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.', id_sender: 154},
                {id: 4, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.', id_sender: 154},

            ],
            activeConversation: this.props.onConversationChange(834),
            groups: this.props.getConversationsHeads(),

        };
    }

    handleSend(){
        if (this.state.message) {
            this.setState(prevState => {
                const id = prevState.messages[prevState.messages.length - 1] + 1;
                prevState.messages.push({
                    id: id,
                    message: prevState.message,
                    id_sender: 154
                });
                prevState.message = '';
                return prevState
            });
        }
    }

    handleChangeInput(event){
        const {value} = event.target;
        this.setState({
            message: value
        });

    }


    groupChanged = (id) => {
        console.log("group changed: ", id);
        const conv = this.props.onConversationChange(id);
        this.setState({
            activeConversation: conv
        });

        // this.props.onConversationChange(id)
    };


    render() {
        const messagesList = this.state.activeConversation.messages.map(message =>
            <div key={message.id}>{message.message}</div>);

        const groupsCompList =
            this.state.groups.map(chat =>
                <ChatGroup
                    key={chat.id}
                    id={chat.id}
                    url={chat.avatar}
                    handleClick={this.groupChanged}
                    active={chat.id === this.state.activeConversation.id}/>);

        return (
            <div id='chat-body'
                 style={{backgroundImage: `url(${bgPic})`}}>
                <div className='main-container'>
                    <div id='groups'>
                        {/*<ChatGroup url={TLogo} />*/}
                        {groupsCompList}

                    </div>
                    <div id='chat'>
                        <div className='chat-head'>

                            <h3>{this.state.activeConversation.name}</h3>


                            <div className='send-form'>

                            </div>

                        </div>
                        <div className='messages' id='mess' ref={(node) => { this.node = node; }}>
                                {messagesList}
                        </div>

                        <div className='send-form'>
                            <input
                                value={this.state.message}
                                type='text'
                                onChange={event => this.handleChangeInput(event)}
                                className='form-control'/>
                            <img src={Photo} alt='uploadPh'/>
                            <img src={File} alt='file'/>
                            <img src={Send} alt='send'
                                 onClick={() => this.handleSend()}/>
                        </div>
                    </div>
                    <div id='details'>
                        {/*DETAILS*/}
                        {this.state.message}
                    </div>
                </div>
            </div>
    )
    }
}

export default MainPage;
