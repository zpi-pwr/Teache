import React, {Component} from "react"
import {connect} from "react-redux";
import Photo from "../assets/photo.png";
import File from "../assets/file.png";
import Send from "../assets/send.png";
import AdvertListItem from "./AdvertListItem";
import { SPRING_URL } from "../constants"
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'

const AdvertView = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 72px auto;
    overflow-y: scroll;
    overflow-x: hidden;
    grid-gap: 5px;
    grid-template-areas: "Asearchbar"
    "AsearchResults";       

    & > .searchbar {
        background-color: rgba(46, 21, 27, 0.9);
        grid-area: Asearchbar;
        height: 72px;
        input[type=text] {
          height: 100%;
          background: none;
          color: white;
        }
    }

    & > .searchResults {
        background-color: rgba(46, 21, 27, 0.3);
        grid-area: AsearchResults;
    }
`

const AdvertDetailsView = styled.div`

`

const MainContainer = styled.div`

`

class AdvertsComponent extends Component {

    constructor(props) {
        super(props);
        const {adverts} = this.props;
        this.state = {
            inputMessage: '',
            adverts: adverts,
            pageCount: 0,
            idActiveAdvert: undefined,
        };
    }

    componentDidMount() {
        this.searchForAdverts();
    }

    searchForAdverts = () => {
        console.log(this.state.inputMessage);
        const searchString = this.state.inputMessage;
        fetch(SPRING_URL + `/api/advert/browse?page=0&limit=10&titleContains=${searchString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                adverts: data.content,
                pageCount: data.totalPages
            });
            console.log(data);
        })
    };

    updateAdverts = (page) => {
        if(page >= this.state.pageCount)
            return null

        const searchString = this.state.inputMessage;
        fetch(SPRING_URL + `/api/advert/browse?page=` + page + `&limit=10&titleContains=${searchString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({
                adverts: [
                    ...this.state.adverts,
                    data.content
                ],
                pageCount: data.totalPages
            });
            console.log(data);
        })
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.searchForAdverts();
        }
    };

    onChoseAdvert = (id) => {
        this.setState({idActiveAdvert: id});
        console.log(`You chose advert ${this.state.adverts.find(element => element.id === id).title}`)
    };

    onInputChange = (event) => {
        const {value} = event.target;
        this.setState({
            inputMessage: value
        });
    };

    render() {
        const adverts = this.state.adverts.map(adv => <AdvertListItem item={adv} onClick={this.onChoseAdvert}/>);
        return (
            <MainContainer>
            
            {
                this.state.selectedAdvert === null ?
                (
                    <AdvertView>
                    {/*<div className="searchbar">search</div>*/}
                        <div className='searchbar'>
                            <input
                                value={this.state.inputMessage}
                                type='text'
                                onChange={event => this.onInputChange(event)}
                                onKeyPress={(event) => this.onKeyPress(event)}
                                className='form-control'
                                placeholder='Search here... 🔎'/>
                        </div>
                        <InfiniteScroll
                            className='searchResults'
                            pageStart={0}
                            loadMore={this.updateAdverts}
                            hasMore={true || false}
                            loader={<div className='loader' key={0}>Loading...</div>} >
        
                            {adverts}
                        </InfiniteScroll>
                    </AdvertView>
                ) : (
                    <AdvertDetailsView>

                    </AdvertDetailsView>
                )
            }
            </MainContainer>
        )
    }
}

function mapStateToProps(state) {
    const {adverts} = state.advertReducer;
    return {adverts};
}

export default AdvertsComponent = connect(mapStateToProps)(AdvertsComponent);
