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
            inputMessage: '',
            adverts: adverts,
            idActiveAdvert: undefined,
        };
    }

    searchForAdverts = () => {
        console.log(this.state.inputMessage);
        const searchString = this.state.inputMessage;
        searchString !== '' ? fetch(`http://localhost:8080/api/advert/browse?limit=10&titleContains=${searchString}`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                adverts: data.content,
                idActiveAdvert: data.content ? data.content[0].id : undefined
            });
            console.log(data);
        })
        : fetch(`http://localhost:8080/api/advert/browse?limit=10`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                adverts: data.content,
                idActiveAdvert: data.content ? data.content[0].id : undefined
            });
            console.log(data);
        });
    };

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.searchForAdverts();
        }
    };

    onChoseAdvert = (id) => {
        this.setState({ idActiveAdvert: id });
        console.log(`You chose advert ${this.state.adverts.find(element => element.id === id).title}`)
    };

    onInputChange = (event) => {
        const { value } = event.target;
        this.setState({
            inputMessage: value
        });
    };

    render() {
        const adverts = this.state.adverts.map(adv => <AdvertListItem item={adv} onClick={this.onChoseAdvert} />);
        return (
            <div className="adv">
                {/*<div className="searchbar">search</div>*/}
                <div className='searchbar'>
                    <input
                        value={this.state.inputMessage}
                        type='text'
                        onChange={event => this.onInputChange(event)}
                        onKeyPress={(event) => this.onKeyPress(event)}
                        className='form-control'
                        placeholder='Search here... 🔎' />
                </div>
                <div className="searchResults">{adverts}</div>
                <div className="advDetails">
                    <div>details</div>
                    <div>{this.state.idActiveAdvert ? this.state.adverts.find(element => element.id === this.state.idActiveAdvert).title : this.searchForAdverts()}</div>
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
