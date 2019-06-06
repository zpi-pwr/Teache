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
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: inline-block;

    & > .searchbar {
        background-color: rgba(46, 21, 27, 0.9);
        height: 72px;
        input[type=text] {
          height: 100%;
          background: none;
          color: white;
        }
    }
`

const AdvertList = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: block;

    padding-bottom: 72px;

    & > .infinite-scroller {
        overflow-y: scroll;
        height: 100%;
        background-color: rgba(46, 21, 27, 0.3);


        & > .loader {
            width: 100%;
            text-align: center;
        }
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
            selectedAdvert: null,
            advertCount: 99999
        };

        this.isLoading = false;
    }

    componentDidMount() {
        //this.updateAdverts(1, true);
    }

    updateAdverts = (page, clean = false) => {

        console.log(page - 1 + ' pageCount: ' + this.state.pageCount +  ' ' + this.isLoading)

        if(!clean && (page - 1 > this.state.pageCount || this.state.adverts.length + 1 > this.state.advertCount))
            return null

        this.isLoading = true;
        
        if(clean) {
            this.setState({
                adverts: [],
                pageCount: 1,
                advertCount: 99999
            })
        }

        const searchString = this.state.inputMessage;
        fetch(SPRING_URL + `/api/advert/browse?page=` + (page - 1) + `&limit=10&titleContains=${searchString}`, {
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
                pageCount: data.totalPages,
                advertCount: data.totalElements
            }, () => {
                console.log(this.state)
            });
        }).then(() => {
            this.isLoading = false;
        })
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.scroller.pageLoaded = 1;
            this.updateAdverts(1, true)
        }
    };

    onChoseAdvert = (advert) => {
        this.setState({selectedAdvert: advert});
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

                        <AdvertList>
                            <InfiniteScroll ref={scroller => this.scroller = scroller}
                                    className='infinite-scroller'
                                    pageStart={0}
                                    loadMore={this.updateAdverts}
                                    threshold={10}
                                    useWindow={false}
                                    hasMore={this.state.adverts.length < this.state.advertCount}
                                    loader={<div className='loader' key={0}>Loading...</div>} >
                                    
                                    {adverts}
                            </InfiniteScroll>
                        </AdvertList>
                    </AdvertView>
                ) : (
                    <AdvertDetailsView>
                        <button onClick={e => this.onChoseAdvert(null)}>RESET</button>
                        <p>{this.state.selectedAdvert.id}</p>
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
