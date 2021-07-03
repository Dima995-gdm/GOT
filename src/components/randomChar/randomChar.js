import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './randomChar.css';
import Spinner from '../spinner';
import ErrorMessage from '../error';

function RandomChar({getChar}) {

    const [char, setChar] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect (() => {
        updateChar()
        const timerId = setInterval(updateChar, 5000)
        return () => {
            clearInterval(timerId)
        }
    }, [])



    function onCharLoaded(char) {
        setChar(char)
        setLoading(false)
    }

    function onError(err) {
        setError(true)
        setLoading(false)
    }

    function updateChar() {
        const id = Math.floor(Math.random() * 200 + 20)
        getChar(id)
            .then(onCharLoaded)
            .catch(onError)
    }



    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null


    const content = !(loading || error) ? <View char={char}/> : null


    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );

}

export default RandomChar;


const View = ({char}) => {
    const { name, gender, born, died, culture } = char

    return (
			<>
				<h4>Random Character: {name}</h4>
				<ListGroup flush>
					<ListGroupItem className="d-flex justify-content-between">
						<span className="term">Gender </span>
						<span>{gender}</span>
					</ListGroupItem>
					<ListGroupItem className="d-flex justify-content-between">
						<span className="term">Born </span>
						<span>{born}</span>
					</ListGroupItem>
					<ListGroupItem className="d-flex justify-content-between">
						<span className="term">Died </span>
						<span>{died}</span>
					</ListGroupItem>
					<ListGroupItem className="d-flex justify-content-between">
						<span className="term">Culture </span>
						<span>{culture}</span>
					</ListGroupItem>
				</ListGroup>
			</>
		);
}
