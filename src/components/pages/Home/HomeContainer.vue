<script setup>
import { onMounted } from 'vue';
import { AuthAPI, ReptileAPI } from '@/api';

import DashboardLayout from '@/DashboardLayout.vue';
import HomePresenter from './HomePresenter.vue';

import { useAuthStore } from '@/stores/auth';

import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const authStore = useAuthStore();
const reptiles = ref(null);

const token = authStore.loadToken();

const handleDelete = async (id) => {
  if (confirm(`정말 삭제하시겠습니까?`)) {
    try {
      const result = ReptileAPI.delete({
        id: id,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('삭제가 완료됐습니다.');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('삭제 취소됨');
  }
};

onMounted(async () => {
  const { data } = await ReptileAPI.reptiles({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  reptiles.value = [...data];
  console.log('reptiles.value', reptiles.value);
});
</script>

<template>
  <DashboardLayout>
    <HomePresenter
      v-if="reptiles"
      :reptiles="reptiles"
      :files="files"
      :handleDelete="handleDelete"
    />
  </DashboardLayout>
</template>
