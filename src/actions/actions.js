import { GET_DOLAR_INFO } from '../actions/types';

import { getDolarValue } from './../services/DolarValueServices';
//------------------------------- aa
export const getDolarInfo = () => {

    return (dispatch) => {
        return getDolarValue()
            .then(res => {
                console.log(res.data.Dolares);
                dispatch(getDolar(res.data.Dolares));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export const getDolar = (data) => {
    return {
        type: GET_DOLAR_INFO,
        payload: data,
    }
};