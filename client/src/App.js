import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';

const App = () => {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<EventList />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </div>
  );
};

export default App;