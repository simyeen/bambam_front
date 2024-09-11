import { defineStore } from 'pinia';

export const useReptileStore = defineStore('user', {
  state: () => ({
    birthDate: '',
    image: '',
    name: '',
    reptileId: '',
    speciesId: 3,
    userId: 1
  })
});
