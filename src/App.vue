<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { UserAPI } from '@/api';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const userStore = useUserStore();

const initFetch = async () => {
  const token = authStore.loadToken();

  try {
    const { data } = await UserAPI.info({
      headers: {
        Authorization: `Bearer ${token}` // Bearer 토큰 형식으로 Authorization 헤더에 추가
      }
    });

    userStore.userId = data.userId;
    userStore.username = data.username;
    userStore.email = data.email;
    userStore.role = data.role;
  } catch (error) {
    console.log('토큰이 유효하지 않습니다.');
  }
};

onMounted(() => {
  initFetch();
});
</script>

<template>
  <RouterView />
</template>
