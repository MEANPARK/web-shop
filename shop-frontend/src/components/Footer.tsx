

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">고객센터</h3>
            <p className="font-bold text-2xl">1588-XXXX</p>
            <p>운영시간: 평일 10:00 ~ 18:00</p>
            <p>점심시간: 12:30 ~ 13:30</p>
            <p>주말 및 공휴일 휴무</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">회사정보</h3>
            <p>회사명: 주식회사 픽셀샵</p>
            <p>대표: 홍길동</p>
            <p>주소: 서울특별시 강남구 테헤란로 123</p>
            <p>사업자등록번호: 123-45-67890</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">이용안내</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-900">회사소개</a></li>
              <li><a href="#" className="hover:text-gray-900">이용약관</a></li>
              <li><a href="#" className="hover:text-gray-900">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-gray-900">고객센터</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center">
          <p>COPYRIGHT ⓒ 2024 주식회사 픽셀샵. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
