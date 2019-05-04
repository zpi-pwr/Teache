import React, { Component } from "react";
import TeacheCoin from "../tokens/TeacheCoin"

import Web3 from "web3-js";

class AccountBalanceComponent extends Component {
    constructor() {
        super()

        this.isWeb3 = true;
        this.isWeb3Locked = false;

        this.state = {
            balance: 0
        }

        this.checkWeb3()
    }

    checkWeb3() {
        let web3 = window.web3;

        if (typeof web3 !== 'undefined') {
            this.web3Provider = web3.currentProvider
            console.log(this.web3Provider)
            this.web3 = new Web3(web3.currentProvider)

            this.token = web3.eth.contract(TeacheCoin.abi).at(TeacheCoin.address)
            console.log(this.token)
            if (web3.eth.coinbase === null) {
                this.isWeb3Locked = true;
            }
        } else {
            this.isWeb3 = false;
        }
    }

    componentDidMount() {
        if(this.isWeb3) {
            let account = this.web3.eth.coinbase
            console.log(this.token)
            this.token.balanceOf(account, (error, response) => {
                if(!error) {
                    let decimal = this.token.decimal
                    let precision = '1e' + decimal
                    let balance = response.c[0] / precision
                    // let name = this.token.name
                    // let symbol = this.token.symbol
                    // let icon = this.token.icon
                    // let abi = this.token.abi
                    // let address = this.token.address

                    balance = balance >= 0 ? balance : 0

                    console.log(balance)

                }
            })
        }
    }

    render() {
        if(!this.isWeb3) {
            return null;
        }

        if(this.isWeb3Locked) {
            return (
                <div>ACCOUNT BLOCKED</div>
            )
        }

        return (
            <div>Balance: {this.state.balance}</div>
        )
    }
}

class TokenTransferComponent extends Component {

}


export default AccountBalanceComponent;