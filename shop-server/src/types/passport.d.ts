import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as KakaoProfile } from 'passport-kakao';
import { Profile as GithubProfile } from 'passport-github2';

declare global {
  namespace Express {
    interface User {
      provider: 'google' | 'kakao' | 'github';
      profile: GoogleProfile | KakaoProfile | GithubProfile;
    }
  }
}