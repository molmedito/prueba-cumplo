import React from 'react';
import './App.css';

// Redux
import { useDispatch } from 'react-redux';
import { getDolarInfo } from './actions/actions';

// Containers
import Home from './containers/Home';

const App = () => {
  // Use dispatch
  const dispatch = useDispatch();

  // Get dolar info 
  dispatch(getDolarInfo());

  return (
    <Home />
  );
}

export default App;
