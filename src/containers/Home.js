import React from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Components
import DatePicker from '../components/common/DatePicker'
import LineChart from '../components/LineChart';

const Home = () => {
  const dolarValue = useSelector(store => store.dolarInfo);
  const [deliverDateStart, setDeliverDateStart] = React.useState(null);

  const handleDateChange = (date, txt) => {
    let validDate;

    switch (txt) {
        case 'deliverDateStart':
            setDeliverDateStart(date);
            //validDate = validateDates(date);

            //if(deliverDateEnd){ validDate = validateDates(deliverDateEnd, date); }
            break;
    
        default:
            break;
    }
};

  return (
    <div className="dolar-chart">
      <div className="dolar-filters">
        <DatePicker
            type={'deliverDateStart'}
            handleDateChange={handleDateChange}
            date={deliverDateStart}
        />
      </div>
      {dolarValue.length > 1 ?
        <LineChart width={'100%'} height={400} dolarValue={dolarValue} />
        :
        <>No hay datos</>
      }
    </div>
  )
}

export default Home
