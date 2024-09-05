import axios from 'axios';
import authAPI from './authAPI.js';

// Axios 인스턴스 생성
export const Axios = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL, // 환경변수 사용
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 쿠키를 포함하여 요청
});

// AuthAPI에 API 인스턴스 전달
export const AuthAPI = authAPI(Axios);
