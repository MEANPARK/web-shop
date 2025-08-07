import passport from 'passport';
import { Strategy as GithubStrategy, Profile } from 'passport-github2';
import bcrypt from 'bcrypt';
import { User } from '../../user/user.model';
import { signJwt } from '../../../utils/jwt.utils'; // JWT 서명 함수

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
}, async (
  accessToken: string,
  refreshToken: string | undefined,
  profile: Profile,
  done: (error: any, user?: any) => void
) => {
  try {
    const githubId = profile.id;
    const email = profile.emails?.[0]?.value || null;
    const username = profile.username || profile.displayName || 'NoName';

    // 기존 유저 조회
    let user = await User.findOne({ where: { username: githubId + '*github' } });

    if (!user) {
      // 신규 유저 생성
      user = new User();
      const salt = await bcrypt.genSalt();
      user.password = ''; //await bcrypt.hash(githubId, salt);
      user.username = githubId + '*github';
      user.email = email ?? 'no-email@unknown.com';
      user.name = username;
      user.provider = 'github';
      await user.save();
    }

    // JWT 토큰 생성 (payload에 user id 포함)
    const token = signJwt({ id: user.id });

    done(null, { user, token });

  } catch (error) {
    done(error);
  }
}));