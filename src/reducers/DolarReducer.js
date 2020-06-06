import { GET_DOLAR_INFO } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case GET_DOLAR_INFO:
            return action.payload;

        default:
            return state;
    }
}