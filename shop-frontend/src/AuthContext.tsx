import { createContext, useState, useContext, useCallback, useEffect, type ReactNode } from 'react';
import apiClient from './api/axios';

// 사용자 정보 타입 정의
interface User {
  // 백엔드에서 오는 사용자 정보에 맞게 필드를 추가하세요. (예: id, username, email 등)
  provider?: 'kakao' | 'google' | 'github' | 'local'; // 'local'은 일반 아이디/비밀번호 로그인
}

// Context 타입 정의
interface AuthContextType {
  user: User | null;
  loading: boolean; // 로딩 상태 추가
  login: (userData: User) => void;
  logout: () => Promise<void>;
  kakaoLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가 및 초기값 true

  // 앱 시작 시 로그인 상태 확인 및 로그아웃 쿼리 처리
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 백엔드에 현재 사용자 정보 요청
        const response = await apiClient.get('/users/me');
        if (response.data && response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    const handleLogoutRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('status') && urlParams.get('status') === 'logged_out') {
        // URL에서 쿼리 파라미터를 제거하여 깔끔하게 만듭니다.
        window.history.replaceState({}, document.title, window.location.pathname);
        await logout(); // 로그아웃 처리
      }
    };

    const initializeAuth = async () => {
      await handleLogoutRedirect(); // 리디렉션된 로그아웃을 먼저 처리
      await checkLoginStatus(); // 그 다음 로그인 상태 확인
      setLoading(false); // 모든 확인이 끝나면 로딩 상태를 false로 변경
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    setLoading(false); // 로그인 시 로딩 상태 false로 명시
    setUser(userData);
  };

  const logout = useCallback(async () => {
    try {
      // 백엔드에 로그아웃 요청
      await apiClient.post('/users/logout');
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      // user 상태를 null로 설정하여 즉시 UI에 반영
      setUser(null);
    }
  }, []);

  const kakaoLogout = useCallback(async () => {
    // 로그아웃 전 현재 사용자 정보를 확인
    try {
      const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
      const LOGOUT_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI;
      const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
        
      // 페이지를 완전히 이동시켜 카카오 세션을 만료시킴
      window.location.href = kakaoLogoutUrl;

    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, kakaoLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
