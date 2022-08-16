import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditEvent() {
  const defaultEvent = {
    date: '',
    quantity: 0,
    price: 0,
    currency: '',
    taxes: 0,
    info: '',
  };

  const [form, setForm] = useState(defaultEvent);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:8080/api/events/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const event = await response.json();
      if (!event) {
        window.alert(`Event with id ${id} not found`);
        navigate("/");
        return;
      }

      console.log(event.date);
      setForm(event);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedEvent = { ...form };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:8080/api/events/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(editedEvent),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Event</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="date">Date</label>
          <input
            type='date'
            name='date'
            className='form-control'
            value={form.date}
            onChange={(e) => {updateForm({ date: e.target.value })}}
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
            value="Update"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}