import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../associations';
import dotenv from 'dotenv';
dotenv.config();

// 타입 정의
interface AuthResult {
  user: User;
  token: string;
}

export const handleOAuthCallback = (provider: 'google' | 'kakao' | 'github') => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(provider, (
      err: Error | null,
      data: AuthResult | false | null,
      info: any
    ) => {
      if (err) return next(err);
      if (!data) return res.redirect('/login?error=fail');

      const { token } = data;

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      //console.log('Setting cookie with token:', token);
      res.redirect(`${process.env.FRONTEND_URL}/profile`);
    })(req, res, next);
  };
};