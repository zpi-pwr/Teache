import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Text = styled.p`
    & > .metamask-title {
        font-size: 3vh;
    }

    & > .metamask-message {
        font-size: 1.5vh;
    }
`

const InstallWindow = styled.div`
    align-items: center;
    text-align: center;
    padding: 1vh 0.5vw 2vh 0.5vw;
    z-index: 1000;
    position: absolute;
    background: #cccccc;
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

    border-radius: 0.5em;

    &:hover {
        background-color: darkvioletred;
        border: 2px solid white;
    }
`

class InstallMetamask extends Component {
    render() {
        if(!this.props.show) {
            console.log("NOPE")
            return null
        }

        console.log("YES")

        return (
            <InstallWindow>
                <p className="image download-metamask">
                        <Text>
                            <p className="metamask-title">You have to install Metamask to use out token system!</p>
                            <p className="metamask-message">Click on the image below to install Metamask extension</p>
                        </Text>
                        <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">
                            <MetamaskImage src="https://metamask.io/img/metamask.png" alt="Metamask icon"/>
                        </a>
                    </p>
                    <BackButton onClick={this.props.onChange}>Zamknij</BackButton>
            </InstallWindow>
        )
    }
}

InstallMetamask.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool
}

class UnlockMetamask extends Component {
    render() {
        if(!this.props.show) {
            return null
        }

        return (
            <div className="column is-4 is-offset-4">
                <div className="notification is-danger">
                    <BackButton className="delete"></BackButton>
                    {this.props.message}
                </div>
            </div>
        )
    }
}

InstallMetamask.propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool
}

export default InstallMetamask