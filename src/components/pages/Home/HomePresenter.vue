<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

import RadarChart from '@/components/atoms/RadarChart.vue';
import { BUTTON_LIST } from '@/constant/common.js';
import { toImageSrl } from '@/util/data';

const { reptiles } = defineProps({
  reptiles: Array,
  handleDelete: Function
});
const router = useRouter();
const route = useRoute();

const routePath = 'home';

const hoveredPerson = ref(null);

const handleClick = (id) => {
  console.log('클릭', id);
  router.push(`/reptile/${id}`); // id에 맞춰 이동
};

const handleMouseEnter = (reptile) => {
  hoveredPerson.value = reptile.name;
};

const handleMouseLeave = () => {
  hoveredPerson.value = null;
};

console.log('reptile', reptiles);
</script>

<template>
  <main class="lg:pl-72">
    <div v-if="reptiles" id="main-area" class="flex gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      <ul role="list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li
          v-for="reptile in reptiles"
          :key="reptile.reptile_id"
          class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow relative"
          @mouseenter="handleMouseEnter(reptile)"
          @mouseleave="handleMouseLeave"
        >
          <button
            v-if="hoveredPerson === reptile.name"
            @click="handleDelete(reptile.reptileId)"
            class="absolute border-none top-2 right-2 text-semibold bg-white rounded-md px-1 hover:bg-slate-200 transition ease-in-out duration-200 transform hover:scale-110 focus:outline-none"
            style="border: none"
          >
            {{ BUTTON_LIST[routePath] }}
          </button>

          <div @click="handleClick(reptile.reptileId)" class="flex flex-1 flex-col p-8 border-none">
            <img
              class="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              :src="toImageSrl(reptile.image)"
              alt=""
            />
            <h3 class="mt-6 text-sm font-medium text-gray-900">{{ reptile.name }}</h3>
            <!-- <h3 class="mt-6 text-sm font-medium text-gray-900">크레스티드 개코</h3> -->
            <dl class="mt-1 flex flex-grow flex-col justify-between">
              <dt class="sr-only">Title</dt>
              <!-- <dd class="text-sm text-gray-500">{{ reptile.name }}</dd> -->
              <dt class="sr-only">Role</dt>
              <dd class="mt-3">
                <span
                  class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                  >{{ reptile.birthDate }}</span
                >
              </dd>
            </dl>
          </div>
          <div>
            <RadarChart :name="reptile.name" :radarData="radarData" />
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
