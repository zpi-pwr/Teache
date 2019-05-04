import React from 'react'

// import "../styles/Tag.css"

function Tag(props) {
    return (
        <div
            style={
                {
                    "backgroundColor": props.item.color || "#FFFFFF",
                    "borderRadius": "10px",
                    "paddingLeft": "4px",
                    "paddingRight": "4px",
                    "float": "left",
                    "margin": "3px",
                    "font-size": "12px",
                }
            }>
            {props.item.name}
        </div>)

}

export default Tag