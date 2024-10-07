<script setup>
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';

import { ReptileAPI, FeedingAPI } from '@/api';
import { useReptileStore } from '@/stores/reptile';
import { useAuthStore } from '@/stores/auth';

import DashboardLayout from '@/DashboardLayout.vue';
import ReptilePresenter from './ReptilePresenter.vue';

import DetailBox from './DetailBox.vue';
import DetailAddForm from './DetailAddForm.vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const authStore = useAuthStore();
const reptileStore = useReptileStore();
const token = authStore.loadToken();

const isLoading = ref(true);
const open = ref(false);
const open2 = ref(false);

const feedings = ref([]); // API 호출 결과를 저장할 변수const open = ref(false);
const reptile = ref({});

const onToggle = () => {
  open.value = !open.value;
};

const onToggle2 = () => {
  console.log('onToggle2 클릭', open.value);
  open2.value = !open2.value;
};

const addForm = reactive({
  reptileId: route.params.id,
  feedDate: '2024-09-10',
  foodType: 'superfood',
  quantity: 100,
  fed: 'true'
});

const selectedFile = ref(null);

const handleChange = (e) => {
  if (e.target.files) {
    // 파일 입력 처리
    selectedFile.value = e.target.files[0];
    console.log('File selected:', selectedFile.value);
  } else {
    // 일반 입력 처리
    addForm[e.target.name] = e.target.value;
  }
};

const handleSubmit = async (e) => {
  e.preventDefault(); // 기본 폼 제출 동작을 막음

  const formData = new FormData();

  formData.append('reptileId', addForm.reptileId);
  formData.append('feedDate', addForm.feedDate);
  formData.append('foodType', addForm.foodType);
  formData.append('quantity', addForm.quantity);
  formData.append('fed', addForm.fed);
  formData.append('image', selectedFile.value); // `selectedFile`은 파일 선택 시 할당된 파일 객체

  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    const { data } = await FeedingAPI.create({
      data: formData, // formData를 data로 전달
      headers: {
        'Content-Type': 'multipart/form-data', // form-data 형식 명시
        Authorization: `Bearer ${token}` // 인증 토큰 추가
      }
    });

    console.log('data', data);
    alert('새로운 친구가 추가됐습니다!');
    window.location.reload();
  } catch (err) {
    console.error('Error creating reptile', err);
  }
};

onMounted(async () => {
  console.log('홈페이지 마운트 발생');

  // API 호출하여 feedings에 데이터 저장
  const feedingResult = await FeedingAPI.feeding({
    id: route.params.id,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  feedings.value = [...feedingResult.data];

  const reptileResult = await ReptileAPI.reptile({
    id: route.params.id,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  reptile.value = reptileResult.data;
  reptileStore.birthDate = reptileResult.data.birthDate;
  reptileStore.image = reptileResult.data.image;
  reptileStore.name = reptileResult.data.name;
  reptileStore.reptileId = reptileResult.data.reptileId;
  reptileStore.speciesId = reptileResult.data.speciesId;
  reptileStore.userId = reptileResult.data.userId;

  console.log('reptile.value', reptile.value);
  console.log('feedings.value', feedings.value);

  setTimeout(() => {
    isLoading.value = false;
  }, 1000); // 1초 동안 스켈레톤 UI 표시
});

const fileInput = ref(null);

const triggerFileInput = () => {
  console.log('버튼 클릭', fileInput.value);
  fileInput.value.click(); // 버튼 클릭 시 파일 선택기 실행
};

// 파일 선택 시 처리
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('파일 선택됨:', file.name);
  }
};
</script>

<template>
  <DashboardLayout>
    <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
    <DetailBox :open="open" :onToggle="onToggle" />
    <DetailAddForm
      :open="open2"
      :onToggle2="onToggle2"
      :triggerFileInput="triggerFileInput"
      :fileInput="fileInput"
      :handleChange="handleChange"
      :handleFileChange="handleFileChange"
      :handleSubmit="handleSubmit"
    />
    <ReptilePresenter
      :reptile="reptile"
      :feedings="feedings"
      :isLoading="isLoading"
      :onToggle="onToggle"
      :onToggle2="onToggle2"
    />
  </DashboardLayout>
</template>
