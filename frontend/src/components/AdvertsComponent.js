import React, {Component} from "react"
import {connect} from "react-redux";
import "../styles/AdvertsComponent.scss"
import Photo from "../assets/photo.png";
import File from "../assets/file.png";
import Send from "../assets/send.png";
import AdvertListItem from "./AdvertListItem";

class AdvertsComponent extends Component {

    constructor(props) {
        super(props);
        const {adverts} = this.props;
        this.state = {
            adverts: adverts,
        };
    }

    onKeyPress = (event) => {
        console.log(event)
    };

    render() {
        const adverts = this.state.adverts.map(adv => <AdvertListItem item={adv}/>);
        return (
            <div className="adv">
                {/*<div className="searchbar">search</div>*/}
                <div className='searchbar'>
                    <input
                        value={this.props.inputMessage}
                        type='text'
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        className='form-control'/>
                </div>
                <div className="searchResults">{adverts}</div>
                <div className="advDetails">details</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {adverts} = state.advertReducer;
    return {adverts};
}

export default AdvertsComponent = connect(mapStateToProps)(AdvertsComponent);