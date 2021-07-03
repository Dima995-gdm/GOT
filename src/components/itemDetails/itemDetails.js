import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
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


function ItemDetails({itemId, getItem, children}) {

    const [item, setItem] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log(itemId);
        updateItem()
    }, [itemId])



    function onItemDetailsLoaded(item){
        setItem(item)
        setLoading(false)

    }

    function onError(err){
        setItem(item)
        setError(true)
        setLoading(false)
    }
    

    function updateItem() {
        if (!itemId) {
            return
        }

        setLoading(true)

        getItem(itemId)
            .then(onItemDetailsLoaded)
            .catch(onError)
    }


    
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
                React.Children.map(children, (child) => {
                    return React.cloneElement(child, {item})
                })
            }
        </ListGroup>
        </div>
    )


}

export default ItemDetails;

