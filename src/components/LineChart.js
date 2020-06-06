import React from 'react'

import { Line } from 'react-chartjs-2';

const LineChart = ({width, height, dolarValue}) => {

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(250,174,50,1)');   
    gradient.addColorStop(1, 'rgba(250,174,50,0)');

    return {
      labels: ['04/06/2020', '05/06/2020', '08/06/2020'],
      datasets: [
        {
          backgroundColor : gradient,
          borderColor : "#ff6c23",
          borderWidth: 2,
          pointColor : "#fff",
          pointStrokeColor : "#ff6c23",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff6c23",
          label: 'Dolar a peso',
          data: [
            769.13,
            775.58,
            764.97,
          ]
        }
      ]
    }
  }

  var options = {
    responsive: true,
    datasetStrokeWidth : 3,
    pointDotStrokeWidth : 4,
    scaleLabel : "<%= Number(value).toFixed(0).replace('.', ',') + '°C'%>"
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
}

export default LineChart
