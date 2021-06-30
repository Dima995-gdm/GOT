import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import './app.css';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import {CharacterPage, HousePage, BookPage, BooksItem} from '../pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class App extends Component{

    state = {
        show: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }



    ToogleRandomChar = () => {
        this.setState(({show}) => {
            return {
                show: !show
            }
            
        })
    
    }



    render() {
        const {show} = this.state

        const showRandomChar = show ? <RandomChar/> : null

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {showRandomChar}                           
                            <Button 
                                color="danger"
                                onClick={this.ToogleRandomChar}>Toogle random character
                            </Button>
                            </Col>
                        </Row>

                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/houses' component={HousePage} />
                        <Route path='/books' exact component={BookPage} />
                        <Route path= '/books/:id' render= {
                            ({match}) => {
                                const {id} = match.params

                                return <BooksItem bookId = {id} />}
                        }/>
                    </Container>
                </div>
            </Router>

        );

    }

};



