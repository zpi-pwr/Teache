import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Text = styled.p`
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
        width: 16vw;
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
            amount: 0
        }
    }

    handleAmountChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

    sendTokens = () => {
        let target = this.props.targetAddress;
        let amount = this.state.amount;

        if(amount <= this.props.balance && amount > 0) {
            this.props.contract.transfer(target, amount * this.props.decimals, (error, response) => {
                if(error || error !== null) {
                    console.log(error);
                } else {
                    this.props.close()
                }
            })
        }
    }

    render() {
        if(!this.props.show) {
            return null
        }

        return (
            <FormWindow>
                <TransferForm>
                    <Text>
                        <div>Target wallet address: </div>
                        <input className="inputField" type="text" value={this.props.targetAddress} disabled />
                    </Text>
                    <Text>
                        <div>Amount (max. {this.props.balance + " " + this.props.symbol}): </div>
                        <input 
                            className="inputField"
                            id="amountField"
                            type="number" 
                            min={0} 
                            max={this.props.balance} 
                            placeholder={"Amount to send, example: 100 " + this.props.symbol}
                            onChange={this.handleAmountChange} />
                    </Text>
                </TransferForm>
                <BackButton onClick={this.props.close}>CLOSE</BackButton>
                <SendButton onClick={this.sendTokens}>SEND</SendButton>
            </FormWindow>
        )
    }
}

TokenTransferForm.propTypes = {
    userAddress: PropTypes.string,
    targetAddress: PropTypes.array,
    balance: PropTypes.number,
    contract: PropTypes.object,
    symbol: PropTypes.string,
    show: PropTypes.bool
}

export default InstallMetamask;