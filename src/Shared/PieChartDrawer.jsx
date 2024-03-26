import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({data}) {

let Temp =  [
            { id: 0, value: data[0], label: 'Great', color: '#90EE90' },
            { id: 1, value: data[1], label: 'Good', color: '#32CD32' },
            { id: 2, value: data[2], label: 'Neutral', color:'#F0E68C' },
            { id: 3, value: data[3], label: 'Bad', color: '#FF9933' },
            { id: 4, value: data[4], label: 'Worst', color: '#C62828' },
          ]
  return (
    <PieChart
      series={[
        {
          data: Temp,
        },
      ]}
      width={400}
      height={200}
    />
  );
}
