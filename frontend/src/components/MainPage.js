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
            groups: [
                {id: 345, url: 'https://randomuser.me/api/portraits/med/women/21.jpg'},
                {id: 243, url: 'https://randomuser.me/api/portraits/med/men/56.jpg'},
                {id: 834, url: 'https://randomuser.me/api/portraits/med/men/47.jpg'},
                {id: 153, url: 'https://randomuser.me/api/portraits/med/women/96.jpg'},
                {id: 152, url: 'https://randomuser.me/api/portraits/med/women/79.jpg'}
            ],
            nrOfGroups: 4,
            activeGroup: 834,
            message: 'piszę do ',
            messages: [
                {id: 0, message: 'Cześć!', id_sender: 154},
                {id: 1, message: 'Hej', id_sender: 463},
                {id: 2, message: 'Co u Ciebie?', id_sender: 154},
                {id: 3, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.\n' +
                        '\n' +
                        'Sed quis justo lectus. Vestibulum imperdiet finibus nulla in tempor. Quisque faucibus dolor sit amet ante cursus ultricies. Fusce posuere nisi dictum pulvinar porta. Nullam sodales dolor nunc, nec pellentesque tellus molestie rhoncus. Quisque non justo et erat laoreet laoreet sit amet a mauris. Maecenas at consequat ante. Sed sodales tempor ligula, at eleifend orci. Nulla eget magna ac sapien consectetur faucibus.\n' +
                        '\n' +
                        'Donec sagittis est metus, nec molestie odio porta id. Sed urna purus, rhoncus eget interdum at, aliquet id ex. Nulla et mi vitae tortor sodales euismod ac eget tellus. Duis porta egestas nisl, at imperdiet arcu tristique non. Sed lacinia erat in elit interdum, vel placerat mauris mollis. Etiam pulvinar nunc id mollis sollicitudin. Duis laoreet ornare feugiat. Praesent faucibus ipsum nulla, sit amet vulputate felis auctor eget. Vestibulum fringilla justo arcu, ac vehicula nisl dignissim luctus. Etiam consequat malesuada risus sed ullamcorper. Integer viverra turpis pulvinar, rutrum diam nec, eleifend arcu. Etiam urna ante, sodales vitae nisl in, auctor consectetur urna. Sed a augue mi. Morbi a finibus justo. Nam lectus erat, luctus et ornare in, facilisis at ipsum. Pellentesque molestie nisl varius orci vehicula rutrum.\n' +
                        '\n' +
                        'Praesent semper dolor ut lacus eleifend ultricies tempor non tellus. Ut et purus in neque venenatis consectetur rhoncus at sapien. Proin in ante id ligula elementum finibus. Vestibulum commodo velit in mi facilisis, vitae imperdiet metus iaculis. Sed lacinia dui vitae erat accumsan, non tristique neque auctor. Donec ante leo, dignissim nec volutpat vel, molestie sit amet odio. Aenean non magna iaculis, aliquet erat vitae, tincidunt tortor. Etiam imperdiet interdum lacus imperdiet rhoncus. Aenean luctus sit amet felis vitae fermentum. Nullam ultricies eleifend quam. Aliquam vitae justo dolor.\n' +
                        '\n' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et tellus interdum, tincidunt leo in, pretium tortor. Donec eget tortor risus. Nulla elementum massa quis nisl egestas pulvinar. Mauris sollicitudin erat justo, quis semper eros pharetra vitae. Ut sit amet erat est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus interdum ultricies eros, vitae sodales libero commodo at. Sed quis convallis ante. Morbi ultrices odio at pellentesque volutpat. Donec est dui, pharetra nec varius convallis, venenatis nec dolor. Duis non mi turpis. Vivamus dictum diam eu eros tempus, non eleifend metus finibus. Duis suscipit a libero non malesuada. Donec non massa dui. Nulla sit amet facilisis nunc, a ultrices libero.', id_sender: 154},
                {id: 4, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id orci in ligula feugiat condimentum id nec nibh. Curabitur vehicula pretium tortor quis aliquam. Etiam sed tellus pharetra, mattis mauris et, vestibulum erat. Curabitur euismod, tellus sed iaculis egestas, quam erat vestibulum turpis, laoreet egestas magna enim non turpis. Proin sapien lectus, facilisis in urna vel, ultricies imperdiet ligula. Suspendisse potenti. Vivamus feugiat risus a nisi varius, in condimentum erat hendrerit. Quisque in ante sollicitudin eros ultricies posuere vel a eros. Praesent id lorem eu orci molestie varius. Sed quis semper ante. Ut iaculis non massa a mollis. Aliquam egestas eros enim, vitae pretium felis euismod a. Duis congue a sapien at pharetra. Maecenas efficitur in enim fringilla porta. Morbi sagittis quam eget purus iaculis condimentum. Ut ac sodales felis.\n' +
                        '\n' +
                        'Sed quis justo lectus. Vestibulum imperdiet finibus nulla in tempor. Quisque faucibus dolor sit amet ante cursus ultricies. Fusce posuere nisi dictum pulvinar porta. Nullam sodales dolor nunc, nec pellentesque tellus molestie rhoncus. Quisque non justo et erat laoreet laoreet sit amet a mauris. Maecenas at consequat ante. Sed sodales tempor ligula, at eleifend orci. Nulla eget magna ac sapien consectetur faucibus.\n' +
                        '\n' +
                        'Donec sagittis est metus, nec molestie odio porta id. Sed urna purus, rhoncus eget interdum at, aliquet id ex. Nulla et mi vitae tortor sodales euismod ac eget tellus. Duis porta egestas nisl, at imperdiet arcu tristique non. Sed lacinia erat in elit interdum, vel placerat mauris mollis. Etiam pulvinar nunc id mollis sollicitudin. Duis laoreet ornare feugiat. Praesent faucibus ipsum nulla, sit amet vulputate felis auctor eget. Vestibulum fringilla justo arcu, ac vehicula nisl dignissim luctus. Etiam consequat malesuada risus sed ullamcorper. Integer viverra turpis pulvinar, rutrum diam nec, eleifend arcu. Etiam urna ante, sodales vitae nisl in, auctor consectetur urna. Sed a augue mi. Morbi a finibus justo. Nam lectus erat, luctus et ornare in, facilisis at ipsum. Pellentesque molestie nisl varius orci vehicula rutrum.\n' +
                        '\n' +
                        'Praesent semper dolor ut lacus eleifend ultricies tempor non tellus. Ut et purus in neque venenatis consectetur rhoncus at sapien. Proin in ante id ligula elementum finibus. Vestibulum commodo velit in mi facilisis, vitae imperdiet metus iaculis. Sed lacinia dui vitae erat accumsan, non tristique neque auctor. Donec ante leo, dignissim nec volutpat vel, molestie sit amet odio. Aenean non magna iaculis, aliquet erat vitae, tincidunt tortor. Etiam imperdiet interdum lacus imperdiet rhoncus. Aenean luctus sit amet felis vitae fermentum. Nullam ultricies eleifend quam. Aliquam vitae justo dolor.\n' +
                        '\n' +
                        'Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et tellus interdum, tincidunt leo in, pretium tortor. Donec eget tortor risus. Nulla elementum massa quis nisl egestas pulvinar. Mauris sollicitudin erat justo, quis semper eros pharetra vitae. Ut sit amet erat est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus interdum ultricies eros, vitae sodales libero commodo at. Sed quis convallis ante. Morbi ultrices odio at pellentesque volutpat. Donec est dui, pharetra nec varius convallis, venenatis nec dolor. Duis non mi turpis. Vivamus dictum diam eu eros tempus, non eleifend metus finibus. Duis suscipit a libero non malesuada. Donec non massa dui. Nulla sit amet facilisis nunc, a ultrices libero.', id_sender: 154},

            ],

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
        })

    }


    groupChanged = (id) => {
        this.setState(prevState => {
            return prevState.activeGroup = id
        })
    };


    render() {
        const messagesList = this.state.messages.map(message =>
            <div key={message.id}>{message.message}</div>);

        const groupsCompList =
            this.state.groups.map(chat =>
                <ChatGroup
                    key={chat.id}
                    url={chat.url}
                    handleClick={this.groupChanged}
                    active={chat.key === this.state.activeGroup}/>);

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

                            <h3>Hannah Reed</h3>


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
