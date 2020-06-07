import React from 'react'

import { Line } from 'react-chartjs-2';

const makeNumberFromString = str => parseFloat(str.replace(/,/g,'.'));

const LineChart = ({width, height, dolarInfoList}) => {
  let dataset = [], labels = [];

  if(dolarInfoList.length > 0){
    let totalDolar = 0;

    for (let i = 0; i < dolarInfoList.length; i++) {
      const dolar = dolarInfoList[i];

      totalDolar = totalDolar + makeNumberFromString(dolar.Valor);
      
      dataset.push(makeNumberFromString(dolar.Valor));
      labels.push(dolar.Fecha);
    }

    const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(4, 101, 33, 1)');   
      gradient.addColorStop(1, 'rgba(4, 101, 33, 0.2)');

      return {
        labels,
        datasets: [
          {
            backgroundColor : gradient,
            borderColor : "rgb(3, 65, 22)",
            borderWidth: 2,
            pointColor : "#fff",
            pointStrokeColor : "rgb(3, 65, 22)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgb(3, 65, 22)",
            hoverRadius: 8,
            pointRadius: 6,
            hoverBorderWidth: 2,
            label: 'Valor dolar',
            data: dataset
          }
        ]
      }
    }

    var options = {
      //animation: false,
      responsive: true,
      datasetStrokeWidth : 3,
      pointDotStrokeWidth : 4,
      scales: {
        yAxes: [{
          ticks: {
              userCallback: function(value, index, values) {
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  
                  value = value.join('.');
                  return '$' + value;
              }
          }
      }]
      }
    };

    const divStyle = {
      width: width,
    };

    return (
      <div className="row">
        <div className="col-12 line-chart pb-4" style={divStyle}>
          <Line 
            data={data} 
            options={options}
          />
        </div>
        <div className="col-12">
          <h4>Promedio: {`$${parseInt(totalDolar / dolarInfoList.length)}`}</h4>
        </div>
        <div className="col-12">
          <h4>Máximo: {`$${Math.max.apply(Math, dataset)}`}</h4>
        </div>
        <div className="col-12">
          <h4>Mínimo: {`$${Math.min.apply(Math, dataset)}`}</h4>
        </div>
      </div>
    )
  } else {
    return (<></>)
  }
}

export default LineChart
