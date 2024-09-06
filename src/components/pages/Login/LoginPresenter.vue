<script>
import { ref, onMounted } from 'vue';
import SignIn from '@/components/blocks/SignIn';

export default {
  name: 'LoginPresenter',
  props: {
    loginForm: Object,
    handleSubmit: Function,
    handleChange: Function
  },
  components: {
    SignIn
  },
  setup() {
    const logoVisible = ref(false);
    const modalVisible = ref(false);
    const passwordResetModalVisible = ref(false);

    const toggleModal = () => {
      console.log('toggelModal 작동', modalVisible, modalVisible.value);
      modalVisible.value = !modalVisible.value;
    };

    const togglePasswordResetModal = () => {
      passwordResetModalVisible.value = !passwordResetModalVisible.value;
    };

    onMounted(() => {
      logoVisible.value = true;
    });

    return {
      logoVisible,
      modalVisible,
      passwordResetModalVisible,
      toggleModal,
      togglePasswordResetModal
    };
  }
};
</script>

<template>
  <div class="bg-white w-full">
    <SignIn v-if="modalVisible" :modalVisible="modalVisible" :toggleModal="toggleModal" />
    <!-- <PasswordReset
      v-if="passwordResetModalVisible"
      :modalVisible="passwordResetModalVisible"
      @click="togglePasswordResetModal"
    /> -->
    <div
      class="relative h-screen isolate px-6 pt-14"
      :class="{
        'bg-gray-200 opacity-10 dark:bg-opacity-80': modalVisible || passwordResetModalVisible
      }"
    >
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
      <div class="flex flex-col mt-32">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <div
            class="opacity-0 transform scale-95 transition-opacity duration-1000 ease-in"
            :class="{ 'opacity-100': logoVisible }"
          >
            <img class="mx-auto h-10 w-auto" src="/images/logo-no-bg.png" alt="Your Company" />
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              뱀뱀이를 위한 KT 펫케어
            </h2>
          </div>
        </div>
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >이메일</label
              >
              <div class="mt-2">
                <input
                  name="email"
                  @change="handleChange"
                  required
                  class="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                  >비밀번호</label
                >
                <div class="block text-sm font-medium leading-6 text-indigo-600 cursor-pointer">
                  <p class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    비밀번호를 잊으셨나요?
                  </p>
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  @change="handleChange"
                  required
                  class="p-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="space-y-2">
              <button
                @click="handleSubmit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                로그인
              </button>
            </div>
          </form>
          <p class="mt-10 text-center text-sm text-gray-500">
            최초 로그인 시 상태가 유지됩니다.
            <span
              @click="toggleModal"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              회원가입 하기
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
