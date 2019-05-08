import React, { Component } from "react"
import ChatGroup from './ChatGroup'
import bgPic from "../assets/mntnFHD_compressed_cut.jpeg";
import Message from './Message'

import { connect } from "react-redux";
import GroupsComponent from "./GroupsComponent";
import ChatComponent from "./ChatComponent";
import styled from 'styled-components'
import DetailsComponent from "./DetailsComponent";
import '../styles/mainPage.scss'
import { Messages } from "../data/Messages";
import { Mutation, Query, graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import AdvertsComponent from "./AdvertsComponent";
import { SEND_MESSAGE_GQL, getConversationGql, GET_ME } from "../queries/gql"

import { InstallMetamask, UnlockMetamask, TokenTransferForm } from "./Metamask"

import TeacheCoin from "../tokens/TeacheCoin";

const Container = styled.div`
    position: absolute;
    top: 5%;
    left: 50%;
    width: 90%;
    height: 80%;
    transform: translate(-50%);
    display: grid;
    grid-gap: 4px;`;

const styleOptCollapsed = {
    gridTemplateColumns: '230px auto',
    // gridTemplateRows: '95%',
};

const styleOptUnCollapsed = {
    gridTemplateColumns: '230px auto 320px',
    // gridTemplateRows: '95%',
};

const Balance = styled.div`
    position: absolute;
    font-size: 1.5em;
    right: 1.5vw;
    top: 1.5vh;
    text-align: right;
`

class MainPage extends Component {

    constructor(props) {
        super(props);
        // const {conversations, groups} = this.props;

        this.state = {
            inputMessage: '',
            activeConversation: 0,
            mainItemActive: true,
            width: 0,
            isCollapsed: false,
            userID: '5ca1c9a11c9d4400003e3590',
            nickname: "Monteth",
            modalDialogs: {
                installMetamaskVisible: false,
                unlockMetamaskVisible: false,
                transferFormVisible: false
            }
        };

        this.isWeb3 = false;
        this.isWeb3Locked = false;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.loadBalance = this.loadBalance.bind(this)
        this.checkWeb3Compatibility = this.checkWeb3Compatibility.bind(this)
    }

    loadBalance() {
        if (this.isWeb3) {
            window.web3.eth.getCoinbase((error, coinbase) => {
                if (false) {
                    console.log(error)
                } else {
                    let token = this.state.TeacheCoin.token
                    token.balanceOf(coinbase, (error, response) => {
                        if (!error) {
                            let balance = response.c[0] / 10000
                            balance = balance >= 0 ? balance : 0

                            this.setState({
                                TeacheCoin: {
                                    ...this.state.TeacheCoin,
                                    balance: balance,
                                    symbol: TeacheCoin.symbol,
                                    decimal: '1e' + TeacheCoin.decimal
                                }
                            }, () => {
                                console.log(this.state)
                            })
                        }
                    })
                }
            })
        }
    }

    checkWeb3Compatibility() {
        if (window.web3) {
            this.isWeb3 = true;
            window.web3.eth.getCoinbase((error, coinbase) => {
                if (error || coinbase === null) {
                    this.isWeb3Locked = true;
                } else {
                    this.isWeb3Locked = false;
                    this.setState({
                        TeacheCoin: {
                            ...this.state.TeacheCoin,
                            account: coinbase,
                            token: window.web3.eth.contract(TeacheCoin.abi).at(TeacheCoin.address)
                        }
                    }, () => {
                        this.loadBalance()
                    })
                }
            })
        } else {
            this.isWeb3 = false;
        }
    }

    closeDialogs = () => {
        this.setState({
            modalDialogs: {
                installMetamaskVisible: false,
                unlockMetamaskVisible: false,
                transferFormVisible: false
            }
        })
    }

    handleTokenTransfer = () => {
        let installMetamask = false
        let unlockMetamask = false
        let transferForm = false

        if (!this.isWeb3) {
            installMetamask = true
        } else if (this.isWeb3Locked) {
            unlockMetamask = true
        } else {
            transferForm = true
        }

        this.setState({
            modalDialogs: {
                installMetamaskVisible: installMetamask,
                unlockMetamaskVisible: unlockMetamask,
                transferFormVisible: transferForm
            }
        })
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions)
        window.addEventListener('load', this.checkWeb3Compatibility)

        if (window.web3) {
            window.web3.currentProvider.publicConfigStore.on('update', () => {
                this.checkWeb3Compatibility()
            })
        }
    }

    componentWillMount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        const w = window.innerWidth;
        this.setState({
            width: w,
            isCollapsed: w <= 960
        });
    }

    handleSend() {
        const message = this.state.inputMessage;
        console.log(`Sending message: ${message}`);
        if (message) {
            const id_conv = this.state.activeConversation;
            const id_sender = this.state.userID;

            this.props.sendMessageGql({
                variables: {
                    content: message,
                    id_conv: id_conv,
                    id_sender: id_sender
                }
            });
            this.setState(prevState => {
                prevState.inputMessage = '';
                return prevState
            });
        }
    }

    getGroups() {
        return <Query query={GET_ME} variables={{ nickname: this.state.nickname }}>
            {({ loading, error, data }) => {
                if (loading) return `Loading...`;
                if (error) return `Error! ${error}`;

                return data.me.conversations.map((conv, index) =>
                    <ChatGroup
                        key={index}
                        id={conv.id}
                        url={conv.avatarUrl}
                        name={conv.name}
                        handleClick={this.groupChanged}
                        active={conv.id === this.state.activeConversation}>
                        {this.onNewData(conv.ethWallet, conv.name)}
                    </ChatGroup>);
            }}
        </Query>
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSend();
        }
    };

    handleChangeInput(event) {
        const { value } = event.target;
        this.setState({
            inputMessage: value
        });
        console.log("input")
    }

    openMainItem = () => {
        this.setState({
            mainItemActive: true,
            activeConversation: null
        });
        console.log("Open Main Item")
    };


    groupChanged = (id) => {
        console.log("group changed: ", id);
        this.setState({
            activeConversation: id,
            mainItemActive: false
        });
    };

    showDetails = (id) => {
        console.log(id);
    };

    findActive = (conversation) => {
        const { activeConversation } = this.state;
        return conversation.id === activeConversation
    };

    onNewData = (wallet) => {
        if (this.state.wallet !== this.state.activeEthWallet) {
            this.setState({
                activeEthWallet: wallet,
            })
            console.log(`active wallet: ${wallet}`)
        }
    }
    getMessages() {
        const activeConversation = this.state.activeConversation;
        if (activeConversation !== 0) {
            return (<Query query={getConversationGql} variables={{ activeConversation }} pollInterval={2000}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error}`;
                    console.log("data");
                    console.log(data);
                    return data.conversation.messages.map((message, index) =>
                        <Message
                            key={index}
                            model={message}
                            isActive={message.sender.id === this.state.userID}>
                        </Message>);
                }}
            </Query>)
        } else {
            return "No conversation"
        }
    }

    render() {
        const {
            userID,
            activeConversation,
            isCollapsed,
            mainItemActive,
            inputMessage,
        } = this.state;

        console.log("this.props")
        console.log(this.props)

        const messagesList = this.getMessages();


        const groupsCompList = this.getGroups()

        return (
            <div>
                <Container
                    style={isCollapsed ? styleOptCollapsed : styleOptUnCollapsed}>
                    <GroupsComponent
                        mainItemActive={mainItemActive}
                        openMainItem={this.openMainItem}
                        list={groupsCompList} />
                    {this.state.mainItemActive
                        ? <AdvertsComponent />
                        : <ChatComponent
                            handleOver={this.showDetails}
                            userId={userID}
                            onSendToken={this.handleTokenTransfer}
                            conversationID={this.state.activeConversation}
                            messages={messagesList}
                            inputMessage={inputMessage}
                            onChange={event => this.handleChangeInput(event)}
                            onKeyPress={this.handleKeyPress}
                            onClick={() => this.handleSend()} />
                    }
                    {!isCollapsed ?
                        <DetailsComponent
                            isMainActive={this.state.mainItemActive}
                            activeConv={activeConversation}
                            userId={userID}
                        /> : null}
                </Container>

                {this.isWeb3 && !this.isWeb3Locked
                    ? <Balance>Balance: {this.state.TeacheCoin.balance + " " + this.state.TeacheCoin.symbol} </Balance>
                    : null}

                <InstallMetamask close={this.closeDialogs} show={this.state.modalDialogs.installMetamaskVisible} />
                <UnlockMetamask close={this.closeDialogs} show={this.state.modalDialogs.unlockMetamaskVisible} />

                {this.isWeb3 && !this.isWeb3Locked
                    ? <TokenTransferForm
                        userAddress={this.state.TeacheCoin.account}
                        targetAddress={this.props.conversation.ethWallet}
                        balance={this.state.TeacheCoin.balance}
                        decimals={this.state.TeacheCoin.decimal}
                        contract={this.state.TeacheCoin.token}
                        symbol={this.state.TeacheCoin.symbol}
                        show={this.state.modalDialogs.transferFormVisible}
                        close={this.closeDialogs} />
                    : null}
            </div>
        )
    }
}

function mapStateToProps(state) {
    // const {conversations, groups} = state.chatReducer;
    // const {adverts} = state.advertReducer;
    // return {conversations, groups, adverts};
    // return { adverts };
}

export default compose(
    // graphql(getConversationGql, {
    //     options: (props) => ({
    //         variables: {
    //             activeConversation: props.activeConversation
    //         }
    //     })
    // }),
    graphql(SEND_MESSAGE_GQL, { name: 'sendMessageGql' })
)(MainPage);

// export default MainPage = connect(mapStateToProps)(MainPage);
