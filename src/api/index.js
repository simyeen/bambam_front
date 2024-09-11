import axios from 'axios';
import authAPI from './authAPI.js';
import reptileAPI from './reptileAPI.js';
import userAPI from './userAPI.js';
import feedingAPI from './feedingAPI.js';
import statisAPI from './statisAPI.js';

export const Axios = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL, // 환경변수 사용
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const AuthAPI = authAPI(Axios);
export const UserAPI = userAPI(Axios);
export const ReptileAPI = reptileAPI(Axios);
export const FeedingAPI = feedingAPI(Axios);
export const StatisAPI = statisAPI(Axios);
