<script setup>
// 컴포지션 API 스타일
import { useCartStore } from '@/stores/cart.js';
import { storeToRefs } from 'pinia';

// 저장소 획득
const cartStore = useCartStore();

//console.log(  cartStore.item )
//console.log(  cartStore.cartItem )
const { item, cartItem  } = cartStore
console.log(  item )
console.log(  cartItem )

// 장바구니에 상품 추가 기능 함수
// cartItem에 id 추가
const inCart = (id) => {
  cartItem.push(id);
};

// 장바구니에서 상품 삭제 기능 함수
// cartItem에 id 삭제
const deleteCart = (id) => {
  cartStore.outCart(id);
};
</script>
<template>
  <h1>쇼핑 목록</h1>
  <RouterLink to="/cart">장바구니 이동</RouterLink>
  <ul>
    <li
      v-for="it in item"
      :key="it.id"
      :class="{ styleIn: cartItem.includes(it.id) }"
    >
      <span>{{ it.name }}</span>
      <span>{{ it.price }}</span>
      <button v-if="!cartItem.includes(it.id)" @click="inCart(it.id)">
        담기
      </button>
      <button v-else @click="deleteCart(it.id)">삭제</button>
    </li>
  </ul>
</template>
<style scoped>
.styleIn {
  text-decoration: line-through;
}
</style>
