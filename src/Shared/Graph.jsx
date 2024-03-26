import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy previous chart instance
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: data.label,
            data: data.values,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Cleanup on component unmount
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineGraph;
