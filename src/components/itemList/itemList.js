import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../error';

import './itemList.css';


function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        getData()
            .then( (data) => {
                updateList(data)
                setLoading(false)
            })
            .catch(onError)
    }, [getData])


    function onError(err){
        setError(true)

    }


    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item
            const label = renderItem(item)
            return (
                <ListGroupItem 
                    action 
                    key={id}
                    onClick={() => onItemSelected(id)}>
                    {label}
                </ListGroupItem>
            )
        })
    }


    if(error){
        return <ErrorMessage/>
    }

    if(loading) {
        return <Spinner/>
    }

    const items = renderItems(itemList)

    return (
        <ListGroup className='item-list'>
            {items}
        </ListGroup>
    );

}

export default ItemList;