import React from 'react'

function Message(props) {
    let styleL = {

        display: 'inline',
        borderRadius: '10px',
        padding: '4px',
        backgroundColor: '#00bc8c',
        float: 'left',
        margin: '3px',
        clear: 'both',
        maxWidth: '70%',
    }
    let styleR = {

        display: 'inline',
        borderRadius: '10px',
        padding: '4px',
        backgroundColor: '#00cec9',
        float: 'right',
        margin: '3px',
        clear: 'both',
        maxWidth: '70%',
    }
return (
    <div style={props.isActive ? styleR : styleL}
         onMouseOver={() => props.handleOver(props.id)}
    >
        {props.message}
    </div>
)
}

export default Message