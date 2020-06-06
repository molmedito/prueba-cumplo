import { combineReducers } from 'redux';

import DolarReducer from './DolarReducer'

export default combineReducers({
    dolarInfo: DolarReducer,
});