<script setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

const { data } = defineProps({
  data: Array
});

// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// 차트 데이터
const chartData = {
  labels: data.map((item) => item.foodType), // 음식 종류 설정
  datasets: [
    {
      label: '먹이 종류',
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#9CCC65',
        '#FF7043',
        '#AB47BC',
        '#8D6E63',
        '#26A69A',
        '#EF5350',
        '#5C6BC0'
      ],
      data: data.map((item) => item.count) // 음식 카운트 설정
    }
  ]
};

// 차트 옵션
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: true,
      text: 'Food Type Distribution'
    }
  }
};
</script>

<template>
  <main class="lg:pl-72">
    <div id="main-area" class="flex gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      <!-- 파이차트 렌더링 -->
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </main>
</template>
