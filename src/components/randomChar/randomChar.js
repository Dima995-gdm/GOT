import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../error';

export default class RandomChar extends Component {


    gotService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false

    }


    componentDidMount(){
        this.updateChar()
        this.timerId = setInterval(this.updateChar, 5000)
    }

    componentWillUnmount(){
        clearInterval(this.timerId)
    }


    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
            
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 200 + 20)
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error } = this.state

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
}


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
