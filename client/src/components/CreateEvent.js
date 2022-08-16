import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateEvent() {
    const defaultEvent = {
        date: Date.now(),
        quantity: 1,
        price: 1.00,
        currency: 'BRL',
        taxes: 0,
        info: ''
    };

    const [form, setForm] = useState(defaultEvent);
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newEvent = { ...form };

        await fetch("http://localhost:8080/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        }).catch(error => {
            window.alert(error);
            return;
        });

        setForm(defaultEvent);
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="container">
            <h3>Create New Event</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="date">Date</label>
                    <input
                        type='date'
                        name='date'
                        className='form-control'
                        value={form.date}
                        onChange={(e) => updateForm({ date: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type='number'
                        placeholder='0'
                        name='quantity'
                        className='form-control'
                        value={form.quantity}
                        onChange={(e) => updateForm({ quantity: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="price">Price</label>
                    <input
                        type='number'
                        placeholder='0'
                        name='price'
                        className='form-control'
                        value={form.price}
                        onChange={(e) => updateForm({ price: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="currency">Currency</label>
                    <input
                        type='text'
                        placeholder='Currency'
                        name='currency'
                        className='form-control'
                        value={form.currency}
                        onChange={(e) => updateForm({ currency: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="taxes">Taxes</label>
                    <input
                        type='number'
                        placeholder='0'
                        name='taxes'
                        className='form-control'
                        value={form.taxes}
                        onChange={(e) => updateForm({ taxes: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="info">Info</label>
                    <input
                        type='text'
                        placeholder='Info'
                        name='info'
                        className='form-control'
                        value={form.info}
                        onChange={(e) => updateForm({ info: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
