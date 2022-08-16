import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import EditEvent from './components/EditEvent';

const App = () => {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/edit/:id" element={<EditEvent />} />
      </Routes>
    </div>
  );
};

export default App;