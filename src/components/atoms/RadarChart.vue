<template>
  <div>
    <canvas ref="radarChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadarController,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
} from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadarController,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);

const { name } = defineProps({
  name: String
});

const radarChart = ref(null);

const radarData = {
  뱀뱀이: [15, 90, 1, 97, 100],
  댕댕이: [20, 30, 40, 100, 70],
  괭괭이: []
};

const data = {
  labels: ['강인함', '신속함', '똑똑함', '귀여움', '먹성'],
  datasets: [
    {
      label: '종합',
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      pointBackgroundColor: 'rgba(34, 202, 236, 1)',
      data: radarData[name]
      // data: [65, 59, 90, 81, 56, 55]
    }
    // {
    //   label: 'Character B',
    //   backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //   borderColor: 'rgba(255, 99, 132, 1)',
    //   pointBackgroundColor: 'rgba(255, 99, 132, 1)',
    //   data: [28, 48, 40, 19, 96, 27]
    // }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true
    }
  }
};

onMounted(() => {
  new ChartJS(radarChart.value, {
    type: 'radar',
    data,
    options
  });
});
</script>

<style scoped>
canvas {
  max-width: 600px;
  max-height: 600px;
}
</style>
