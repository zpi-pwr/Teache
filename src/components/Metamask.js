import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { getConversationGql } from '../queries/gql'
import { graphql } from 'react-apollo'
import { apolloClient } from '../apollo'

const Text = styled.div`
    color: #000000

    & > .metamask-title {
        font-size: 3vh;
    }

    & > .metamask-message {
        font-size: 1.5vh;
    }

    & > .metamask-unlock {
        font-size: 2vh;
    }

    padding-top: 1em;
`

const FormWindow = styled.div`
    align-items: center;
    text-align: center;
    padding: 2vh 1.5vw 2vh 1.5vw;
    z-index: 1000;
    position: absolute;
    background: #ffffff;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 15px;
`

const MetamaskImage = styled.img`
    max-width: 50vw;
    max-height: 50vh;
    height: auto;
    width: auto;
    object-fit: contain;
`

const BackButton = styled.button`
    background-color: palevioletred;
    padding: 0.75rem 1.5rem;
    color: white;
    border: transparent;
    margin-top: 2em;
    margin-bottom: 2em;

    border-radius: 0.5em;

    &:hover {
        background-color: darkvioletred;
        border: 2px solid white;
    }
`

const SendButton = styled(BackButton)`
    background-color: lightgreen;

    &:hover {
        background-color: darkgreen;
        border: 2px solid white;
    }

    margin-left: 2vw;
`

const TransferForm = styled.form`
    & .inputField {
        width: 24vw;
        height: 4vh;
        background: transparent;
        border: 2px solid grey;
        border-radius: 10px;
        padding: 1.5vh 1vw 1.5vh 1vw;
    }

    & #amountField {
        margin-left: 1vw;
        margin-right: 1vw;
    }

    & .selectField {
        width: 24vw;
        height: 4vh;
        background: transparent;
        margin-left: 1vw;
        margin-right: 1vw;
        border: 2px solid grey;
        border-radius: 10px;
        text-indent: 1vw;
    }
`

export class InstallMetamask extends Component {
    render() {
        if(!this.props.show) {
            return null
        }

        return (
            <FormWindow>
                <p className="image download-metamask">
                        <Text>
                            <p className="metamask-title">You have to install Metamask to use our token system!</p>
                            <p className="metamask-message">Click on the image below to install Metamask extension</p>
                        </Text>
                        <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">
                            <MetamaskImage src="https://metamask.io/img/metamask.png" alt="Metamask icon"/>
                        </a>
                    </p>
                    <BackButton onClick={this.props.close}>CLOSE</BackButton>
            </FormWindow>
        )
    }
}

InstallMetamask.propTypes = {
    close: PropTypes.func.isRequired,
    show: PropTypes.bool
}

export class UnlockMetamask extends Component {
    render() {
        if(!this.props.show) {
            return null
        }

        return (
            <FormWindow>
                <div className="notification is-danger">
                    <Text>
                        <p className="metamask-unlock">Your account is locked! Please unlock your Metamask vault!</p>
                    </Text>
                    <BackButton onClick={this.props.close}>CLOSE</BackButton>
                </div>
            </FormWindow>
        )
    }
}

export class TokenTransferForm extends Component {
    constructor() {
        super()

        this.state = {
            amount: 0,
            targetAddress: null,
            data: null,
            loadedUsers: false
        }
    }

    getConvData() {
        if (this.props.show && !this.state.loadedUsers) {
            const activeConversation = this.props.activeConv
            apolloClient.query({
                query: getConversationGql, 
                variables: {
                    activeConversation
                } 
            }).then(response => {
                const contrData = response.data.conversation.contributors
                const contributors = contrData.filter(u => u.ethWallet || u.ethWallet === "" || u.ethWallet === this.props.teacheCoin.account)
                if(contributors.length > 0) {
                    this.setState({
                        data: contributors,
                        loadedUsers: true,
                        targetAddress: contributors[0].ethWallet
                    })
                } else {
                    this.closeDialog()
                }
            })
        }
    }  

    handleAmountChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

    sendTokens = (targetAddress) => {
        const amount = this.state.amount
        const teacheCoin = this.props.teacheCoin

        if(amount <= teacheCoin.balance && amount > 0) {
            teacheCoin.token.transfer(this.state.targetAddress, amount * teacheCoin.decimal, (error, response) => {
                if(error || error !== null) {
                    console.log(error);
                } else {
                    this.closeDialog()
                }
            })
        }
    }

    closeDialog = () => {
        this.setState({
            loadedUsers: false
        })
        this.props.close()
    }

    selectTarget = (event) => {
        this.setState({
            targetAddress: event.target.value
        }, () => {
            console.log(this.state.targetAddress)
        })
    }

    render() {
        if(!this.props.show) {
            return null
        }
        
        this.getConvData()

        if(this.state.data == null) {
            return null
        }

        return (
            <FormWindow>
                <TransferForm>
                    <Text>
                        <div>Send to: </div>
                        <select className="selectField" onChange={this.selectTarget}>
                            {
                                this.state.data.map(u => 
                                    <option key={u.id} value={u.ethWallet}>{u.nickname}</option>
                                )
                            }
                        </select>
                    </Text>
                    <Text>
                        <div>Target wallet address: </div>
                        <input className="inputField" id="targetField" type="text" value={this.state.targetAddress} disabled />
                    </Text> 
                    <Text>
                        <div>Amount (max. {this.props.teacheCoin.balance + " " + this.props.teacheCoin.symbol}): </div>
                        <input 
                            className="inputField"
                            id="amountField"
                            type="number" 
                            min={0} 
                            max={this.props.teacheCoin.balance} 
                            placeholder={"Amount to send, example: 100 " + this.props.teacheCoin.symbol}
                            onChange={this.handleAmountChange} />
                    </Text>
                </TransferForm>
                <BackButton onClick={this.closeDialog}>CLOSE</BackButton>
                <SendButton onClick={this.sendTokens}>SEND</SendButton>
            </FormWindow>
        )
    }
}

TokenTransferForm.propTypes = {
    teacheCoin: PropTypes.object,
    activeConv: PropTypes.number,
    show: PropTypes.bool
}

export default 
    graphql(getConversationGql, { 
        options: (props) => ({ 
            variables: { 
                activeConv: props.activeConv
            } 
        })
    })( TokenTransferForm );