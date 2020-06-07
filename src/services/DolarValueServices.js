import axios from 'axios';

const apiKey = '9c84db4d447c80c74961a72245371245cb7ac15f';

export const getDolarValue = (startDate, endDate) => {
    return axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${startDate.year}/${startDate.month}/dias_i/${startDate.day}/${endDate.year}/${endDate.month}/dias_f/${endDate.day}?apikey=${apiKey}&formato=json`);
}