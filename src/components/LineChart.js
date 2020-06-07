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
      gradient.addColorStop(0, 'rgba(250,174,50,1)');   
      gradient.addColorStop(1, 'rgba(250,174,50,0)');

      return {
        labels,
        datasets: [
          {
            backgroundColor : gradient,
            borderColor : "#ff6c23",
            borderWidth: 2,
            pointColor : "#fff",
            pointStrokeColor : "#ff6c23",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#ff6c23",
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
      height: height
    };

    return (
      <div className="line-chart" style={divStyle}>
        <Line 
          data={data} 
          options={options}
        />

        <h1>Promedio: {`$${parseInt(totalDolar / dolarInfoList.length)}`}</h1>
        <h1>Máximo: {`$${Math.max.apply(Math, dataset)}`}</h1>
        <h1>Mínimo: {`$${Math.min.apply(Math, dataset)}`}</h1>
      </div>
    )
  } else {
    return (<></>)
  }
}

export default LineChart
