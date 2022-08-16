import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';

const App = () => {
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<EventList />} />
        <Route path="/add" element={<CreateEvent />} />
      </Routes>
    </div>
  );
};

export default App;