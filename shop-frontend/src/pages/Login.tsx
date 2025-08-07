
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import apiClient from '../api/axios';
import axios from 'axios'; // 에러 타입 체킹을 위해 import 추가

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSocialLogin = (provider: 'google' | 'kakao' | 'github') => {
    window.location.href = `http://localhost:3000/auth/${provider}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      await apiClient.post('/users/login', {
        username,
        password,
      });

      // 응답으로 받은 쿠키는 브라우저에 자동으로 저장됩니다.
      // 1. 전역 상태를 "로그인됨"으로 변경 (provider 정보 추가)
      login({ provider: 'local' });
      // 2. 홈페이지로 이동
      navigate('/');

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // 로그인 실패 시 처리 (서버에서 보낸 에러 메시지 사용)
        alert(`로그인 실패: ${error.response.data.message}`);
        console.error('로그인 실패:', error.response.data);
      } else {
        // 네트워크 오류 등 예외 처리
        alert('로그인 요청 중 오류가 발생했습니다.');
        console.error('로그인 요청 오류:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">로그인</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => handleSocialLogin('kakao')}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FEE500] hover:bg-yellow-400"
          >
            카카오로 로그인
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Google로 로그인
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('github')}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#333] hover:bg-gray-800"
          >
            GitHub으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
