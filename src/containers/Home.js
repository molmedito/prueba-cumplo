import React from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Components
import LineChart from '../components/LineChart';


const Home = () => {
  const dolarValue = useSelector(store => store.dolarInfo);

  return (
    <div className="dolar-table">
      <LineChart width={500} height={200} dolarValue={dolarValue} />

      {/*dolarValue ?
        <>
          {dolarValue.map(dolar => {
            return (
              <div className="prueba">{dolar.Valor}</div>
            )
          })}
        </>
        :
        <>No hay datos</>
      */} 
    </div>
  )
}

export default Home
