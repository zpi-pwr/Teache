import React, { Component } from "react"
import { connect } from "react-redux";
import "../styles/AdvertsComponent.scss"
import Photo from "../assets/photo.png";
import File from "../assets/file.png";
import Send from "../assets/send.png";
import AdvertListItem from "./AdvertListItem";

class AdvertsComponent extends Component {

    constructor(props) {
        super(props);
        const { adverts } = this.props;
        this.state = {
            adverts: adverts,
            idActiveAdvert: adverts[0].id
        };
    }

    onKeyPress = (event) => {
        console.log(event)
    };

    onChoseAdvert = (id) => {
        this.setState({idActiveAdvert: id})
        console.log(`You chose advert ${this.state.adverts.find(element => element.id === id).title}`)
    }

    render() {
        const adverts = this.state.adverts.map(adv => <AdvertListItem item={adv} onClick={this.onChoseAdvert} />);
        return (
            <div className="adv">
                {/*<div className="searchbar">search</div>*/}
                <div className='searchbar'>
                    <input
                        value={this.props.inputMessage}
                        type='text'
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        className='form-control'
                        placeholder='Search here... 🔎' />
                </div>
                <div className="searchResults">{adverts}</div>
                <div className="advDetails">
                    <div>details</div>
                    <div>{this.state.adverts.find(element => element.id === this.state.idActiveAdvert).title}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { adverts } = state.advertReducer;
    return { adverts };
}

export default AdvertsComponent = connect(mapStateToProps)(AdvertsComponent);