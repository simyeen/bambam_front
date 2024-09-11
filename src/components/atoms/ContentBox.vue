<script setup>
const { isLoading, files, onToggle } = defineProps({
  isLoading: Boolean,
  files: Array,
  onToggle: Function
});
</script>

<template>
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
    <li v-for="file in files" :key="file.source" class="relative">
      <div
        class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
      >
        <img
          :src="file.source"
          alt=""
          class="pointer-events-none object-cover group-hover:opacity-75"
        />
        <button @click="onToggle" type="button" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for {{ file.title }}</span>
        </button>
      </div>
      <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
        {{ file.title }}
      </p>
      <p class="pointer-events-none block text-sm font-medium text-gray-500">
        {{ file.size }}
      </p>
    </li>
  </ul>
</template>

<style scoped>
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
