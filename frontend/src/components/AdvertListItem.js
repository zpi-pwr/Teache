import React, {Component} from 'react'
import "../styles/AdvertListItem.scss"
import Tag from "./Tag";

class AdvertListItem extends Component {
    render() {
        const img= this.props.item.img || "http://placehold.it/75/";
        const title= this.props.item.title || "Title";
        const description= this.props.item.description || "Description";
        const tags= this.props.item.tags || [];
        const tagViews = tags.map(tag => <Tag item={tag}/>);

        return (
            <div className="advitem">
                <div className="advMedia">
                    <img src={img} sizes="75px 75px"/>
                </div>
                <div className="advInfo">
                    <div><h5>{title}</h5></div>
                    <div>{description || "Spoko grupka, polecam"}</div>
                    <div>{tagViews}</div>
                </div>
                {/*<div className="spacer"/>*/}
            </div>
        )
    }
}

export default AdvertListItem;