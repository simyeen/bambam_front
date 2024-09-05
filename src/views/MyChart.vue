<script>
// 차트를 구성하는 요소를 모듈 가져오기 
import axios from 'axios';
import {
    Chart as ChartJS, // as 별칭, 차트 본체
    // 나머지 요소는 차트를 구성하는 요소:제목, 툴팁, 범례,...
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

// 구체화된 실제 차트 -> 바차트
import { Bar } from 'vue-chartjs'

// 차트에 요소들 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// 컴포넌트 구성
export default {
    // 콤퍼넌트 이름
    name: 'App',
    // 다른 컴포넌트를 현컴포넌트에서 사용한다면 => 등록해야함
    components: {
        // 바차트 컴포넌트 등록 -> <Bar 사용가능함
        Bar
    },
    // 데이터 => 차트를 구성하는 데이터
    data() {
        console.log( "데이터 세팅" )
        return {
            loading:false, // 차트가 완성되기 전에 로딩 표기->차트 완성되면->사라짐
            category: {
                labels: [], // 항목 (집계기준 카테고리값)
                datasets: [
                    {
                        label:"차트",
                        backgroundColor:'#f83823',
                        data:[] // 특정항목(카운트, 평균가격,..)
                    }
                ]
            },
            // 차트 옵션
            options: {
                maintainAspectRatio: false,
                responsive: true
            }
        }
    },
    // 차트 구성에 필요한 데이터 획득->컴포넌트가 화면에 보이기 직전->라이프사이클 훅
    mounted () {
        console.log( "컴포넌트 mounted call" )
        // 1. 스프링부트에 요청 -> 데이터 획득 : 통신
        // 0.5초후에 통신 진행(단발성)
        try {
            setTimeout( async () => {
                // 스트링부트에서 크로스도메인 처리 추가해서 개발
                const { data } = await axios.get('http://localhost:8080/api/sales')
                console.log( data );
                // 데이터에 통신 결과값 설정
                this.category = {
                    labels: data.map( sale=>sale.category), 
                    datasets: [
                        {
                            label:"카테고리별 주문 건수(2019년)",
                            backgroundColor:'#f83823',
                            data:data.map( sale=>sale.cnt ) // 특정항목(카운트, 평균가격,..)
                        }
                    ]
                }
            }, 1000*0.5 ); 
        } catch (error) {
            console.log( error )
        }
            
        
    }

}
</script>
<template>
    <div style="width: 100%; height: 200px;">
        <Bar v-bind:data="category" :options="options"/>
        <div v-if="!loading">로딩중</div>
    </div>
</template>
<style></style>