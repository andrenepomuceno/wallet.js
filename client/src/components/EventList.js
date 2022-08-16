import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = (props) => (
    <tr>
        <td>{props.event.date}</td>
        <td>{props.event.quantity}</td>
        <td>{props.event.price}</td>
        <td>{props.event.currency}</td>
        <td>{props.event.taxes}</td>
        <td>{props.event.info}</td>
        <td>{props.event.total}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.event._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteEvent(props.event._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function EventList() {
    const [events, setEvents] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getEvents() {
            const response = await fetch(`http://localhost:8080/api/events`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const events = await response.json();
            setEvents(events);
        }

        getEvents();

        return;
    }, [events.length]);

    // This method will delete a record
    async function deleteEvent(id) {
        await fetch(`http://localhost:8080/api/events/${id}`, {
            method: "DELETE"
        });

        const newEvents = events.filter((el) => el._id !== id);
        setEvents(newEvents);
    }

    // This method will map out the records on the table
    function eventList() {
        return events.map((event) => {
            event.total = event.quantity * event.price + event.taxes;
            return (
                <Event
                    event={event}
                    deleteEvent={() => deleteEvent(event._id)}
                    key={event._id}
                />
            );
    });
}

// This following section will display the table with the records of individuals.
return (
    <div>
        <h1>Event List</h1>
        <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Currency</th>
                    <th>Taxes</th>
                    <th>Info</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>{eventList()}</tbody>
        </table>
    </div>
);
}