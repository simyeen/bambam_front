<script setup>
import ContentBox from '@/components/atoms/ContentBox.vue';
import MainCharacter from '@/components/atoms/MainCharacter.vue';
import { useRoute } from 'vue-router';

const { people } = defineProps({
  people: Object,
  files: Object,
  isLoading: Boolean
});

const route = useRoute();
</script>

<template>
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
  </div>
</template>
