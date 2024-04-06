import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Books from './components/Books';
import Home from './components/Home';
import { Switch } from 'react-router-dom';
import {Fragment} from 'react'
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
 <Home />
 <Books />
    </div>
  );
}

export default App;
