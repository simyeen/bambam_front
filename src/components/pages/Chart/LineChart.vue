<script setup>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

const { data } = defineProps({
  data: Array
});

// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// 더미 데이터
// const data = [
//   { feedDate: '2024-01-20', weight: 12 },
//   { feedDate: '2024-01-21', weight: 9 },
//   { feedDate: '2024-01-22', weight: 7 },
//   { feedDate: '2024-01-23', weight: 11 },
//   { feedDate: '2024-01-24', weight: 14 },
//   { feedDate: '2024-01-25', weight: 8 },
//   { feedDate: '2024-01-26', weight: 10 },
//   { feedDate: '2024-01-27', weight: 6 },
//   { feedDate: '2024-01-28', weight: 5 },
//   { feedDate: '2024-01-29', weight: 15 },
//   { feedDate: '2024-09-13', weight: 150 }
// ];

// 차트 데이터 및 옵션 설정
const chartData = ref({
  labels: data.map((entry) => entry.feedDate), // x축: 날짜
  datasets: [
    {
      label: 'Weight Over Time',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75,192,192,1)',
      data: data.map((entry) => entry.weight), // y축: 몸무게
      fill: true
    }
  ]
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: '2024 Body Weight Change Over Time'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Weight (grams)'
      },
      min: 0,
      suggestedMax: 50 // Adjust the max Y value or set a reasonable range for better scaling
    }
  }
};

// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: true,
//       position: 'top'
//     },
//     title: {
//       display: true,
//       text: '2024 Body Weight Change Over Time'
//     }
//   },
//   scales: {
//     x: {
//       title: {
//         display: true,
//         text: 'Date'
//       }
//     },
//     y: {
//       title: {
//         display: true,
//         text: 'Weight (grams)'
//       },
//       min: 0
//     }
//   }
// };
</script>

<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
