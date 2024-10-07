<script setup>
import ContentBox from '@/components/atoms/ContentBox.vue';
import RadarChart from '@/components/atoms/RadarChart.vue';
import { BUTTON_LIST } from '@/constant/common';

import { toImageSrl } from '@/util/data';
import { ref } from 'vue';

const { reptile, feedings } = defineProps({
  reptile: Object,
  feedings: Object,
  isLoading: Boolean,
  onToggle: Function,
  onToggle2: Function
});

console.log('reptile 확인', reptile);

const hoveredPerson = ref(null);
const handleMouseEnter = (reptile) => {
  hoveredPerson.value = reptile.name;
};

const handleMouseLeave = () => {
  hoveredPerson.value = null;
};
</script>

<template>
  <div id="multi-col">
    <main class="lg:pl-72">
      <div class="xl:pl-96">
        <div id="main-area" class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <!-- 로딩 상태일 때 스켈레톤 UI 표시 -->
          <ul
            v-if="isLoading"
            role="list"
            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            <li v-for="n in 8" :key="n" class="relative">
              <div
                class="skeleton-box aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100"
              ></div>
              <p class="skeleton-text pointer-events-none mt-2 block h-4 bg-gray-200 rounded"></p>
              <p class="skeleton-text pointer-events-none block h-4 bg-gray-200 rounded"></p>
            </li>
          </ul>

          <!-- 로딩이 끝났을 때 실제 파일 목록 표시 -->
          <ul
            v-else
            role="list"
            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            <li v-for="feeding in feedings" :key="feeding.name" class="relative">
              <div
                class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
              >
                <img
                  v-if="feeding.image"
                  :src="toImageSrl(feeding.image)"
                  alt=""
                  class="w-full pointer-events-none object-cover group-hover:opacity-75"
                />
                <div
                  v-else
                  class="h-[197.664px] aspect-h-7 aspect-w-10 flex items-center justify-center bg-gray-200"
                >
                  <span class="text-gray-400">No Image</span>
                </div>

                <button @click="onToggle" type="button" class="absolute inset-0 focus:outline-none">
                  <span class="sr-only">View details for {{ feeding.feedDate }}</span>
                </button>
              </div>
              <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                {{ feeding.feedDate }}
              </p>
              <p class="pointer-events-none block text-sm font-medium text-gray-500">
                {{ feeding.feedDate }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>

    <aside
      class="fixed mt-16 inset-y-0 left-72 hidden w-96 border-r border-gray-200 sm:px-6 lg:px-8 lg:block"
    >
      <main>
        <div id="main-area" class="flex justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <ul
            v-if="isLoading"
            role="list"
            class="grid grid-cols-2 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            <div
              class="skeleton-main-box aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100"
            />
          </ul>

          <ul v-else role="list" class="flex cursor-pointer">
            <li
              :key="reptile.reptile_id"
              class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow relative"
              @mouseenter="handleMouseEnter(reptile)"
              @mouseleave="handleMouseLeave"
            >
              <button
                v-if="hoveredPerson === reptile.name"
                @click="onToggle2"
                class="absolute border-none top-2 right-2 text-semibold bg-white rounded-md px-1 hover:bg-slate-200 transition ease-in-out duration-200 transform hover:scale-110 focus:outline-none"
                style="border: none"
              >
                {{ BUTTON_LIST['reptile'] }}
              </button>

              <div
                @click="handleClick(reptile.reptileId)"
                class="flex flex-1 flex-col p-8 border-none"
              >
                <img
                  v-if="reptile.image"
                  class="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  :src="toImageSrl(reptile.image)"
                  alt=""
                />

                <h3 class="mt-6 text-sm font-medium text-gray-900">{{ reptile.name }}</h3>
                <dl class="mt-1 flex flex-grow flex-col justify-between">
                  <dt class="sr-only">Title</dt>
                  <dd class="text-sm text-gray-500">{{ reptile.name }}</dd>
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
                <RadarChart :name="reptile.name" />
              </div>
            </li>
          </ul>
        </div>
      </main>
    </aside>
  </div>
</template>

<style scoped>
.skeleton-main-box {
  @apply bg-gray-200 w-[236.25px] h-[450.375px] rounded-lg;
  background-image: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400px 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-box {
  @apply bg-gray-200 w-[148.25px] h-[222.375px] rounded-lg;
  background-image: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400px 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text {
  @apply bg-gray-200 w-full h-4 rounded mt-2;
  background-image: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400px 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}
</style>
