<script setup>
import { ref } from 'vue';
import RadarChart from './RadarChart.vue';

const { people } = defineProps({
  people: Object
});

// 각 사람에 대한 hover 상태를 관리하는 반응형 변수
const hoveredPerson = ref(null);

// hover 이벤트 핸들러
const handleMouseEnter = (person) => {
  hoveredPerson.value = person.email;
};

const handleMouseLeave = () => {
  hoveredPerson.value = null;
};

// 삭제 버튼 클릭 시 확인 대화 상자 띄우기
const handleDelete = (person) => {
  if (confirm(`정말 삭제하시겠습니까?`)) {
    console.log(`${person.name} 삭제됨`);
  } else {
    console.log('삭제 취소됨');
  }
};
</script>

<template>
  <ul role="list" class="grid grid-cols-1 gap-6">
    <li
      v-for="person in people"
      :key="person.email"
      class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow relative"
      @mouseenter="handleMouseEnter(person)"
      @mouseleave="handleMouseLeave"
    >
      <button
        v-if="hoveredPerson === person.email"
        @click="handleDelete(person)"
        class="absolute border-none top-2 right-2 text-semibold bg-white rounded-md px-1 hover:bg-slate-200 transition ease-in-out duration-200 transform hover:scale-110 focus:outline-none"
        style="border: none"
      >
        ✕
      </button>

      <div class="flex flex-1 flex-col p-8 border-none">
        <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" :src="person.imageUrl" alt="" />
        <h3 class="mt-6 text-sm font-medium text-gray-900">{{ person.name }}</h3>
        <dl class="mt-1 flex flex-grow flex-col justify-between">
          <dt class="sr-only">Title</dt>
          <dd class="text-sm text-gray-500">{{ person.title }}</dd>
          <dt class="sr-only">Role</dt>
          <dd class="mt-3">
            <span
              class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >{{ person.role }}</span
            >
          </dd>
        </dl>
      </div>
      <div>
        <RadarChart />
      </div>
    </li>
  </ul>
</template>
