<script setup>
import { StatisAPI } from '@/api';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';

import PieChart from './PieChart.vue';
import LineChart from './LineChart.vue';

const authStore = useAuthStore();
const token = authStore.loadToken();

const weightData = ref(null);
const foodTypeData = ref(null);
const averagesData = ref(null);

onMounted(async () => {
  try {
    const weightResult = await StatisAPI.weight({
      id: 16,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    weightData.value = weightResult.data;
    const foodTypeResult = await StatisAPI.foodType({
      id: 16,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    foodTypeData.value = foodTypeResult.data;
    const averagesResult = await StatisAPI.averages({
      id: 16,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    averagesData.value = averagesResult.data;

    console.log(weightResult.data, foodTypeResult.data, averagesResult.data);
    console.log('???', weightData.value, foodTypeData.value, averagesData.value);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <main>
    <div id="main-area" class="flex gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      <PieChart v-if="foodTypeData" :data="foodTypeData" />
      <div class="h-full">
        <LineChart v-if="weightData" :data="weightData" />
      </div>
    </div>
    <div></div>
  </main>
</template>
