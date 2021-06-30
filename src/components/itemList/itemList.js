import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../error';

import './itemList.css';


export default class ItemList extends Component {


    state = {
        itemList: null,
        error: false
    }


    onError = (err) => {
        console.log('error');
        this.setState({
            itemList: null,
            error: true,
        })
    }


    componentDidMount() {
        const {getData} = this.props

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
            .catch(this.onError)
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item
            const label = this.props.renderItem(item)
            return (
                <ListGroupItem 
                    action 
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    }

    render() {

        const {itemList, error} = this.state



        if(error){
            return <ErrorMessage/>
        }

        if(!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList)

        return (
            <ListGroup className='item-list'>
                {items}
            </ListGroup>
        );
    }
}