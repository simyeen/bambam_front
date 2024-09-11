import { defineStore } from 'pinia';

export const useFeedingStore = defineStore('feeding', {
  state: () => ({
    birthDate: '', // 파충류의 생일
    image: '', // 파충류 이미지
    name: '', // 파충류 이름
    reptileId: '', // 파충류 ID
    speciesId: 3, // 종 ID (기본값 3)
    userId: 1, // 사용자 ID (기본값 1)
    description: '', // 설명
    personality: '', // 성격
    weight: null, // 몸무게 (null 또는 기본값)
    owner: '', // 반려인 이름
    strength: null, // 강인함 (정수)
    appetite: null, // 먹성 (정수)
    agility: null, // 신속함 (정수)
    cuteness: null, // 귀여움 (정수)
    intelligence: null // 똑똑함 (정수)
  }),

  actions: {
    setFeedingData(data) {
      this.birthDate = data.birthDate || '';
      this.image = data.image || '';
      this.name = data.name || '';
      this.reptileId = data.reptileId || '';
      this.speciesId = data.speciesId || 3;
      this.userId = data.userId || 1;
      this.description = data.description || '';
      this.personality = data.personality || '';
      this.weight = data.weight || null;
      this.owner = data.owner || '';
      this.strength = data.strength || null;
      this.appetite = data.appetite || null;
      this.agility = data.agility || null;
      this.cuteness = data.cuteness || null;
      this.intelligence = data.intelligence || null;
    }
  }
});
