import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import { User } from '../../user/user.model';
import { signJwt } from '../../../utils/jwt.utils'; // JWT 서명 함수

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
}, async (
  accessToken: string, 
  refreshToken: string | undefined, 
  profile: Profile, 
  done: (error: any, user?: any) => void
) => {
  try {
    // profile에서 필요한 데이터 추출
    const email = profile.emails?.[0].value;
    const googleId = profile.id;

    // 기존 유저 조회
    let user = await User.findOne({ where: { username: googleId + '*google' } });

    if (!user) {
      // 없으면 새로 생성
      user = new User();
      const salt = await bcrypt.genSalt();
      user.password = ''; //await bcrypt.hash(googleId, salt);
      user.username = googleId + '*google';
      user.email = email;
      user.name = profile.displayName;
      user.provider = 'google';
      await user.save();
    }

    // JWT 토큰 생성 (payload에 user id 포함)
    const token = signJwt({ id: user.id });

    done(null, { user, token });

  } catch (error) {
    done(error);
  }
}));