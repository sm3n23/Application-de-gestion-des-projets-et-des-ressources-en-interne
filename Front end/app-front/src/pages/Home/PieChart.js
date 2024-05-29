import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ projectData }) => {
  const chartData = {
    labels: ['Not Started', 'Ongoing', 'Finished'],
    datasets: [
      {
        label: 'Project Status',
        data: projectData,  
        backgroundColor: [
          'rgb(255, 68, 51)',
          'rgb(255, 172, 28)',
          'rgb(0, 128, 0)',
        ],
        borderColor: [
          'rgb(255, 68, 51)',
          'rgb(255, 172, 28)',
          'rgb(0, 128, 0)',
        ],
        borderWidth: 1,
        cutout: '50%',
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels:{
          boxWidth:30,
          padding:20,
        },
      }
    },
    layout: {
      padding: {
        right: 10  // Ensures there is no cut-off on the right side due to the close legend
      }
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default PieChart;
