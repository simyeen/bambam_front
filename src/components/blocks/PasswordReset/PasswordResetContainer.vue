<script setup>
import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import PasswordResetPresenter from './PasswordResetPresenter.vue';

const { passwordResetModalVisible, togglePasswordResetModal } = defineProps({
  passwordResetModalVisible: Boolean,
  togglePasswordResetModal: Function
});
const form = ref({
  email: ''
});

const handleChange = (e) => {
  form.value[e.target.name] = e.target.value;
};

const handleSubmit = async () => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, form.value.email);
    alert('이메일이 전송됐습니다. 잠시만 기다려주세요.');
    form.value.email = '';
  } catch (error) {
    console.log(error);
    alert('아이디 혹은 비밀번호가 틀렸습니다.');
  }
};

const closeModal = () => {
  togglePasswordResetModal(false);
};
</script>

<template>
  <PasswordResetPresenter
    :passwordResetModalVisible="passwordResetModalVisible"
    :closeModal="closeModal"
  />
</template>
