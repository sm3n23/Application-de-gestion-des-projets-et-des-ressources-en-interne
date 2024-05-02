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
          'rgba(34,139,34 , 0.6)',
          'rgba(245, 125, 31, 0.6)',
          'rgba(0,0,0, 0.6)',
        ],
        borderColor: [
          'rgba(34,139,34 , 1)',
          'rgba(245, 125, 31, 1)',
          'rgba(0,0,0, 1)',
        ],
        borderWidth: 1,
        cutout: '40%',
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
        right: 20  // Ensures there is no cut-off on the right side due to the close legend
      }
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default PieChart;
