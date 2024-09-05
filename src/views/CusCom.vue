<script>
export default {
    // 커스텀 속성
    // 배열로 할당, 속성명과 태그 사용시 속성명 동일하게 
    props:['name','job'],
    data () {
        return {
            key:"hello"
        }
    },
    inject: {
        cusLowMessage:{
            from:"lowMessage"
        },
    },
}
</script>

<template>
    <div>
        <!-- 속성 -->
        <p>이름 {{ name }}</p>
        <p>직업 {{ job }}</p>
        <!-- 데이터 -->
        <p>키 {{ this.key }}</p>
        <p>키 {{ cusLowMessage }}</p>
    </div>
</template>

<style scoped>
p {
    color:lightblue;
}
</style>
