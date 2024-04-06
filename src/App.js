import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Books from './components/Books';
import Home from './components/Home';
import { Switch } from 'react-router-dom';
import {Fragment} from 'react'

function App() {
  return (
    <div className="App">
   <Router>
    <Switch>
      <Route path="/" exact component={
        Home
      } />
            <Route path="/books" exact component={
        Books
      } />

    </Switch>
    </Router>
    </div>
  );
}

export default App;
