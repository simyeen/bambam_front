import { reactive } from 'vue';
import { defineStore } from 'pinia';

// 저장소 생성
export const useCartStore = defineStore('cart', () => {
  //1. 실제 개별 저장공간 reactive()
  // 초기 상품 데이터 정의
  const item = reactive([
    {
      id: 1,
      name: '박카스',
      price: 1000
    },
    {
      id: 2,
      name: '토마토주스',
      price: 3000
    },
    {
      id: 3,
      name: '망고주스',
      price: 5000
    },
    {
      id: 4,
      name: '와인',
      price: 4000
    }
  ]);

  // 장바구니 아이템 -> 변수
  const cartItem = reactive([]);

  // 장바구니 삭제 -> 함수
  const outCart = (id) => {
    // 해당 제품 정보와 일치하는 인덱스 추출
    const indexToRemove = cartItem.findIndex((v) => v === id);
    // 찾을 경우에만 장바구니에서 삭제
    if (indexToRemove !== -1) {
      cartItem.splice(indexToRemove, 1);
    }
  };
  // 상품목록, 장바구니, 아이템제거 함수 반환
  return { item, cartItem, outCart };
});
