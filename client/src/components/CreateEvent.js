import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class CreateEvent extends Component {
    constructor() {
        super();
        this.reset();
    }

    reset() {
        this.state = {
            date: Date.now(),
            quantity: 1,
            price: 1.00,
            currency: 'BRL',
            taxes: 0,
            info: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            date: this.state.date,
            quantity: this.state.quantity,
            price: this.state.price,
            currency: this.state.currency,
            taxes: this.state.taxes,
            info: this.state.info
        };

        axios
            .post('http://localhost:8080/api/events', data)
            .then(res => {
                this.reset();
                alert("Sucesso!");
            })
            .catch(err => {
                console.log("Error in CreateEvent!");
            })
    };

    render() {
        return (
            <div className="CreateEvent">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show Event List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Event</h1>
                            <p className="lead text-center">
                                Create new event
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type='date'
                                        placeholder='Date'
                                        name='date'
                                        className='form-control'
                                        value={this.state.date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <div className='form-group'>
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        type='number'
                                        placeholder='0'
                                        name='quantity'
                                        className='form-control'
                                        value={this.state.quantity}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type='number'
                                        placeholder='0'
                                        name='price'
                                        className='form-control'
                                        value={this.state.price}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="currency">Currency</label>
                                    <input
                                        type='text'
                                        placeholder='Currency'
                                        name='currency'
                                        className='form-control'
                                        value={this.state.currency}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="taxes">Taxes</label>
                                    <input
                                        type='number'
                                        placeholder='0'
                                        name='taxes'
                                        className='form-control'
                                        value={this.state.taxes}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="info">Info</label>
                                    <input
                                        type='text'
                                        placeholder='Info'
                                        name='info'
                                        className='form-control'
                                        value={this.state.info}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" className="btn btn-outline-warning btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEvent;