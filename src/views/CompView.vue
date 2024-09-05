<script>
export default {
    // 컴포넌트 속성
    props:['name','job'],
    // 컴포넌트 생성시 호출
    created () {
            // 속성은 무조건 문자열로 전달됨
            console.log( "타입 ", typeof this.age );
    },
    // 2-2. 라이프 사이클 함수
    beforeCreate() {
        // 뷰 애플리케이션 인스턴스가 초기화되고 데이터 및 이벤트가 설정되기 전에 호출
        console.log('beforeCreat');
    },
    created() {
        // 뷰 애플리케이션 인스턴스가 생성된 직후에 호출
        // DOM에는 접근 불가
        console.log('created');
    },
    beforeMount() {
        // 뷰 애플리케이션 인스턴스가 마운트(뷰 애플리케이션이 웹 브라우저에 보이는 상태)되기 전에 호출
        // DOM에 접근 가능
        console.log('beforeMount');
    },
    mounted() {
        // 뷰 애플리케이션 인스턴스가 DOM에 마운트된 후에 호출
        // DOM에 접근 가능
        console.log('mounted');
    },

    // 2-3. 데이터 변경시 화면 리렌더링 관련
    beforeUpdate() {
        // 데이터가 변경되어 DOM이 갱신되기 전에 호출
        console.log('beforeUpdate');
    },
    updated() {
        // 데이터가 변경되어 DOM이 갱신된 후에 호출
        console.log('updated');
    },

    // 2-4. 컴포넌트 해제 및 삭제시 
    beforeUnmount() {        
        // DOM에서 컴포넌트가 언마운트되기 직전에 호출
        console.log('beforeUnmount');
    },
    unmounted() {
        // DOM에서 컴포넌트가 언마운트되면 호출
        console.log('unmounted');
    },
    // 아래 2개는 사용 않함
    // beforeDestroy () {
    //     // 뷰 애플리케이션 인스턴스가 웹 브라우저에서 제거되기 전에 호출
    // },
    // destroyed () {
    //     // 컴포넌트가 삭제되고 호출    
    // }

}
</script>

<template>
    <div>컴포넌트 라이프 사이클</div>
    <div>
        <p>이름 {{ name }}</p>
        <p>직업 {{ job }}</p>
    </div>
</template>

<style scoped>
div {
    color: chocolate;
}
</style>
