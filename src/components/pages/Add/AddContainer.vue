<script setup>
import { ref } from 'vue';

import DashboardLayout from '@/DashboardLayout.vue';
import AddPresenter from './AddPresenter.vue';

import { ReptileAPI } from '@/api';
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';

const authStore = useAuthStore();
const token = authStore.loadToken();

const addForm = reactive({
  name: '',
  birthDate: '',
  speciesId: ''
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

const handleSumbit = async (e) => {
  e.preventDefault(); // 기본 폼 제출 동작을 막음

  const formData = new FormData();
  console.log('addForm', addForm);
  formData.append('name', addForm.name);
  formData.append('birthDate', addForm.birthDate);
  formData.append('userId', '1');
  formData.append('speciesId', '3');
  formData.append('image', selectedFile.value); // `selectedFile`은 파일 선택 시 할당된 파일 객체

  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    const { data } = await ReptileAPI.create({
      data: formData, // formData를 data로 전달
      headers: {
        'Content-Type': 'multipart/form-data', // form-data 형식 명시
        Authorization: `Bearer ${token}` // 인증 토큰 추가
      }
    });

    console.log('data', data);
    alert('새로운 친구가 추가됐습니다!');

    addForm.name = '';
    addForm.birthDate = '';
    addForm.speciesId = '';
    selectedFile.value = null;
  } catch (err) {
    console.error('Error creating reptile', err);
  }

  // return;
};

const handleFileChange = (e) => {
  selectedFile.value = e.target.files[0]; // 파일 선택 시 ref에 파일을 저장
};
</script>

<template>
  <DashboardLayout>
    <AddPresenter
      :handleChange="handleChange"
      :handleFileChange="handleFileChange"
      :handleSumbit="handleSumbit"
    />
  </DashboardLayout>
</template>
