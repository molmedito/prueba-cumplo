import axios from 'axios';

export const getDolarValue = (year = 2020, month = '06', day = '03') => {
    return axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/dolar/posteriores/${year}/${month}/dias/${day}?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json`);
}