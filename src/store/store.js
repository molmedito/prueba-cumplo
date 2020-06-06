import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers and Actions
import rootReducer from '../reducers/reducers';

//
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));