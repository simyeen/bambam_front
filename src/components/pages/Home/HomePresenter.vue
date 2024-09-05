<script setup>
import { ref } from 'vue';

import MainCharacter from '@/components/atoms/MainCharacter.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

const { people } = defineProps({
  people: Object
});
</script>

<template>
  <div v-if="route.path === '/home'">
    <main class="lg:pl-72">
      <div id="main-area" class="flex gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        <MainCharacter :people="people" />
        <MainCharacter :people="people" />
        <MainCharacter :people="people" />
      </div>
    </main>
  </div>
</template>

<!-- 
<div v-if="route.path === '/reptile'" id="multi-col">
      
  <main class="lg:pl-72">
    <div class="xl:pl-96">
      <div id="main-area" class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        <ContentBox :isLoading="isLoading" :files="files" />
      </div>
    </div>
  </main>

  <aside
    class="fixed mt-16 inset-y-0 left-72 hidden w-96 border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 lg:block"
  >
    <MainCharacter :people="people" />
  </aside>

</div> -->
