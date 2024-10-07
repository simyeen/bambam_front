import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('authToken', token); // 토큰을 localStorage에 저장
    },
    loadToken() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        return token;
      } else {
        return null;
      }
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('authToken'); // 토큰 삭제
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
});
