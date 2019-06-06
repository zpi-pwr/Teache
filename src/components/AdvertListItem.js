import React, {Component} from 'react'
import Tag from "./Tag";
import styled from 'styled-components'
import { apolloClient } from '../apollo'
import { graphql } from 'react-apollo'
import { getConversationGql } from '../queries/gql'

const ListItem = styled.div`
    height: 76px;
    background-color: rgba(46, 21, 27, 0.7);
    margin: 5px;
    display: flex-inline;
    flex: wrap;

    & > .advert-image {
        float: left;
        width: 64px;
        height: 64px;
        overflow: hidden;
        border-radius: 32px;
    }

    & > .advInfo {
        padding-left: 24px;
        height: 100%;
        overflow-y: hidden;

        & > .title {

        }

        & > .description {
            height: 100%;
            overflow: hidden;
        }

        & > .tags {

        }
    }

    & > .spacer {
        height: 1px;
        clear: both;
        background-image: linear-gradient(to right, rgba(0,0,0,0), yellow, rgba(0,0,0,0));
    }
`

class AdvertListItem extends Component {

    constructor() {
        super()

        this.state = {}

        this.loadData = this.loadData.bind(this)
    }

    loadData() {
        return apolloClient.query({
            query: getConversationGql,
            variables: {
                'activeConversation': this.props.item.conversationId
            }
        })
    }

    componentDidMount() {
        this.loadData()
        .then(response => {
            this.setState({
                convData: response.data
            })
        })
    }

    render() {
        const convData = this.state.convData;

        if(!convData)
            return null;

        console.log(convData)

        const img = convData.conversation.avatarUrl || "http://placehold.it/75/";
        const title = this.props.item.title || "Title";
        const description = this.props.item.description || "Description";
        const tags = this.props.item.tags || [];
        const tagViews = tags.map(tag => <Tag item={tag}/>);

        return (
            <ListItem onClick={(event) => this.props.onClick(this.props.item)}>
                <img className='advert-image' src={img} alt='advert logo'/>
                <div className="advInfo">
                    <div className='title'><h5>{title} -- {this.props.item.id}</h5></div>
                    <div className='description'>{description || "Spoko grupka, polecam"}</div>
                    <div className='tags'>{tagViews}</div>
                </div>
                {/*<div className="spacer"/>*/}
            </ListItem>
        )
    }
}

export default AdvertListItem;