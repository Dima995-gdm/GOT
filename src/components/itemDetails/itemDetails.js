import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../error';
import './itemDetails.css';


const Field = ({item, field, label}) => {
    
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </ListGroupItem>
    )

}

export {Field} 


export default class ItemDetails extends Component {

    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem()

    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
            
        })
    }

    onError = (err) => {
        console.log('error details');
        this.setState({
            item: null,
            error: true,
            loading: false
        })
    }
    

    updateItem() {
        const {itemId, getItem} = this.props
        if (!itemId) {
            return
        }

        this.setState({
            loading: true
        })

        getItem(itemId)
            .then(this.onItemDetailsLoaded)
            .catch(this.onError)
    }

    render() {

        const {item, loading, error} = this.state



        
        if (!item && error) {
            return <ErrorMessage/>
        } else if (!item) {
            return <span className="select-error">Please select an item</span>
        }

        if (loading) {
            return <Spinner/>
        }


        const { name } = item

        return (
            <div className="item-details rounded">
            <h4>{name}</h4>
            <ListGroup flush>
                {
                    React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ListGroup>
            </div>
        )

    }
}

