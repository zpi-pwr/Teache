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
    grid-gap: 5px;

    & > .searchbar {
        background-color: rgba(46, 21, 27, 0.9);
        height: 72px;
        input[type=text] {
          height: 100%;
          background: none;
          color: white;
        }
    }

    & > .infinite-scroller {
        overflow: auto;
        background-color: rgba(46, 21, 27, 0.3);
        
    }
`

const AdvertDetailsView = styled.div`

`

const MainContainer = styled.div`
    width: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
`

class AdvertsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMessage: '',
            adverts: [],
            pageCount: 1,
            selectedAdvert: null
        };
    }

    componentDidMount() {
        this.updateAdverts(0, true);
    }

    updateAdverts = (page, clean = false) => {
        if(page > this.state.pageCount)
            return null

        if(clean) {
            this.setState({
                adverts: []
            })
        }

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
                    ...data.content
                ],
                pageCount: data.totalPages
            }, () => {
                console.log(this.state)
            });
        })
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.updateAdverts(0, true)
        }
    };

    onChoseAdvert = (id) => {
        this.setState({selectedAdvert: id});
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
                        <div className='infinite-scroller'>
                            <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.updateAdverts}
                                    hasMore={true || false}
                                    loader={<div className='loader' key={0}>Loading...</div>} >
                                    
                                    {adverts}
                            </InfiniteScroll>
                        </div>
                    </AdvertView>
                ) : (
                    <AdvertDetailsView>
                        <button onClick={e => this.onChoseAdvert(null)}>RESET</button>
                        <p>{this.state.selectedAdvert}</p>
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
