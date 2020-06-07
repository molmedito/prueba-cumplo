import { GET_DOLAR_INFO } from '../actions/types';

import { getDolarValue } from './../services/DolarValueServices';
//------------------------------- aa
export const getDolarInfo = (startDate, endDate) => {
    return async (dispatch) => {
        return getDolarValue(startDate, endDate)
            .then(res => {
                console.log(res.data.Dolares);
                dispatch(getDolar(res.data.Dolares, endDate));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export const getDolar = (dolares, endDate) => {
    return {
        type: GET_DOLAR_INFO,
        endDate,
        dolares,
    }
};