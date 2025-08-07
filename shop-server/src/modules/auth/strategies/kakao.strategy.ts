import passport from 'passport';
import { Strategy as KakaoStrategy, Profile } from 'passport-kakao';
import bcrypt from 'bcrypt';
import { User } from '../../user/user.model';
import { signJwt } from '../../../utils/jwt.utils'; // JWT 서명 함수

passport.use(new KakaoStrategy({
  clientID: process.env.KAKAO_CLIENT_ID!,
  clientSecret: process.env.KAKAO_CLIENT_SECRET!,
  callbackURL: `${process.env.BASE_URL}/auth/kakao/callback`,
}, async (
  accessToken: string, 
  refreshToken: string | undefined, 
  profile: Profile, 
  done: (error: any, user?: any) => void
) => {
  try {
    const { _json } = profile;
    const { id, kakao_account, properties } = _json;

    let user = await User.findOne({ where: { username: id.toString() + '*kakao' } });

    if (!user) {
      user = new User();
      const salt = await bcrypt.genSalt();
      user.password = ''; //await bcrypt.hash(id.toString(), salt);
      user.email = kakao_account.email;
      user.username = id.toString() + '*kakao';
      user.name = properties.nickname;
      user.provider = 'kakao';
      await user.save();
    }
    // JWT 토큰 생성 (payload에 user id 포함)
    const token = signJwt({ id: user.id });

    done(null, { user, token });

  } catch (error) {
    done(error);
  }
}));