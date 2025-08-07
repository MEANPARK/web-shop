import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // 백엔드 서버 주소
  withCredentials: true, // 쿠키 자동 전송을 위한 기본 설정
});

export default apiClient;
