import passport from 'passport';

// 각 전략 파일을 불러오기만 하면, 그 안에서 passport.use()가 실행됨
import './strategies/google.strategy';
import './strategies/github.strategy';
import './strategies/kakao.strategy';

export default passport;