import styled from 'styled-components'
import React, {Component} from 'react'

const Details = styled.div`
    display: inline-block;
    background-color: rgba(0, 137, 123, 0.8);`;

export class DetailsComponent extends Component{
    render() {
        return (
            <Details>
                Details Component
            </Details>)
    }
}
