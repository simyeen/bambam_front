<script>
// TODO 응용-#002 동적 경로 매칭을 통해 전달된 데이터를 사용하는 컴포넌트
export default {
  // TODO 응용-#002 컴포넌트 생성되기 전에 추출 가능
  beforeCreate() {
    // TODO 응용-#008
    const code = this.$route.query.code;
    const name = this.$route.query.name;
    console.log(this.$route.params.id);
  },
  data () {
    console.log( '데이터 세팅, 컴포넌트 생성시 1회만 작동' )
    return {
      user_id : this.$route.params.id
    }
  }
};
</script>
<template>
  <h1>User View</h1>
  <!-- TODO 응용-#002 화면에 값 표시, 데이터보다 직접 접근? -->
  <h1>id: {{ $route.params.id }} / {{ user_id }}</h1>
  <!-- // TODO 응용-#008 -->
  <h1>id: {{ this.$route.query.code }} / {{ this.$route.query.name }}</h1>
</template>
