import React from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getDolarInfo } from '../actions/actions';

// Material UI
import FormControl from '@material-ui/core/FormControl';

// Components
import DatePicker from '../components/common/DatePicker';
import LineChart from '../components/LineChart';

// Moment
import * as moment from 'moment';
import "moment/locale/es";
moment.locale("es");

// Reducir días de las fechas con moment.js
const reduceDays = (date, reduced) => {
  let newDate = date._d;

  if(date._d){
    newDate = date._d;
  } else if(typeof date == 'string') {
    newDate = date;
  }

  return moment(newDate).subtract(reduced, "days")
};

// Component
const Home = () => {
  // Use dispatch
  const dispatch = useDispatch();

  // useSelector
  const dolarInfoList = useSelector(store => store.dolarInfo);

  // Setear fechas para inicio y fin (descartan los fin de semana condicionalmente)
  const end = moment().day() === 0 ? reduceDays(moment(), 2) : (moment().day() === 6 ? reduceDays(moment(), 1) : moment());
  const start = reduceDays(end, 3).day() === 0 ? reduceDays(reduceDays(end, 3), 2) : (reduceDays(end, 3).day() === 6 ? reduceDays(reduceDays(end, 3), 1) : reduceDays(end, 3));
  // useState
  const [loading, setLoading] = React.useState(false);
  const [dateStart, setDateStart] = React.useState(start);
  const [dateEnd, setDateEnd] = React.useState(end);

  const handleDateChange = (date, txt) => {
    switch (txt) {
        case 'dateStart':
          setDateStart(date);
          break;
        case 'dateEnd':
          setDateEnd(date);
          break;
    
        default:
            break;
    }
  };

  const handleSubmit = e => {
    const startDate = {
      day: dateStart.format('DD'),
      month: dateStart.format('MM'),
      year: dateStart.format('YYYY'),
    };

    const endDate = {
      day: dateEnd.format('DD'),
      month: dateEnd.format('MM'),
      year: dateEnd.format('YYYY'),
    };

    const start = `${startDate.year}-${startDate.month}-${startDate.day}`;
    const end = `${endDate.year}-${endDate.month}-${endDate.day}`;
    
    if(dolarInfoList.length <= 0){
      setLoading(true);
      // Get dolar info
      dispatch(getDolarInfo(startDate, endDate))
        .then(() => {
          setLoading(false);
        });
    } else if(new Date(dolarInfoList[0].Fecha).getTime() >  new Date(start).getTime() || new Date(dolarInfoList[dolarInfoList.length - 1].Fecha).getTime() < new Date(end).getTime()){
      setLoading(true);
      // Get dolar info
      dispatch(getDolarInfo(startDate, endDate))
        .then(() => {
          setLoading(false);
        });
    } else {
      console.log('NO BUSCA')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 dolar-filters">
          <div className="d-flex">
            <div className="col-6">
              <FormControl>
                <label>Fecha inicial</label>
                <DatePicker
                    type={'dateStart'}
                    handleDateChange={handleDateChange}
                    date={dateStart}
                    maxDate={start}
                />
              </FormControl>
            </div>
            <div className="col-6">
              <FormControl>
                <label>Fecha final</label>
                <DatePicker
                    type={'dateEnd'}
                    handleDateChange={handleDateChange}
                    date={dateEnd}
                    maxDate={end}
                />
              </FormControl>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <div className="col-4">
              <FormControl>
                <button onClick={handleSubmit} className="btn btn-primary" type="submit" disabled={loading}>Obtener datos</button>
              </FormControl>
            </div>
          </div>
        </div>

        {loading ?
          <div key={`loading`} className="loading">Cargando...</div>
          :
          [dolarInfoList.length > 1 ?
            <LineChart key={`line_chart`} width={'100%'} height={400} dolarInfoList={dolarInfoList} />
            :
            <div key={`no_hay_datos`} className="no-data">No hay datos</div>
          ]
        }
      </div>
    </div>
  )
}

export default Home
