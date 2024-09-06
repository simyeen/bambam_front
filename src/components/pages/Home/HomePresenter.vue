<script setup>
import { ref } from 'vue';

import MainCharacter from '@/components/atoms/MainCharacter.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

const { people } = defineProps({
  people: Object,
  handleClick: Function
});
</script>

<template>
  <div v-if="route.path === '/home'">
    <main class="lg:pl-72">
      <div id="main-area" class="flex gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        <MainCharacter :people="people" @click="handleClick" />
        <MainCharacter :people="people" @click="handleClick" />
        <MainCharacter :people="people" @click="handleClick" />
      </div>
    </main>
  </div>
</template>
