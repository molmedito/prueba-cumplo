import React from 'react'

import { Line } from 'react-chartjs-2';

const makeNumberFromString = str => parseFloat(str.replace(/,/g,'.'));

const LineChart = ({width, height, dolarValue}) => {
  let dataset = [], labels = [];

  if(dolarValue.length > 0){
    for (let i = 0; i < dolarValue.length; i++) {
      const dolar = dolarValue[i];
      
      dataset.push(makeNumberFromString(dolar.Valor));
      labels.push(dolar.Fecha);
    }

    console.log(dataset)

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
      </div>
    )
  } else {
    return (<></>)
  }
}

export default LineChart
