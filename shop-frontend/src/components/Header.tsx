import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, logout, kakaoLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const provider = user?.provider;
    // 카카오 로그아웃이 아닌 경우에만 수동으로 홈으로 이동시킵니다.
    if (provider == 'kakao') {
      await kakaoLogout();
    } else {
      await logout();
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex justify-end items-center py-2 text-sm text-gray-500 border-b">
          {user ? (
            <button onClick={handleLogout} className="ml-4 hover:text-gray-800">로그아웃</button>
          ) : (
            <Link to="/login" className="ml-4 hover:text-gray-800">로그인</Link>
          )}
          <a href="#" className="ml-4 hover:text-gray-800">마이페이지</a>
          <a href="#" className="ml-4 hover:text-gray-800">장바구니</a>
        </div>

        {/* Main header */}
        <div className="flex justify-between items-center py-6">
          <div className="text-3xl font-extrabold text-blue-600">
            <Link to="/">PixelShop</Link>
          </div>
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-0 top-0 mt-2 mr-3">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div>
            {/* Future icons */}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t border-b">
        <div className="container mx-auto flex justify-center items-center py-3">
          <a href="#" className="mx-6 text-gray-800 hover:text-blue-600 font-bold">NEW</a>
          <a href="#" className="mx-6 text-gray-800 hover:text-blue-600 font-bold">STREAMER</a>
          <a href="#" className="mx-6 text-gray-800 hover:text-blue-600 font-bold">FASHION</a>
          <a href="#" className="mx-6 text-gray-800 hover:text-blue-600 font-bold">DOLL</a>
          <a href="#" className="mx-6 text-gray-800 hover:text-blue-600 font-bold">KEYRING</a>
          <a href="#" className="mx-6 text-gray-800 hover:text-blue-600 font-bold">SALE</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
