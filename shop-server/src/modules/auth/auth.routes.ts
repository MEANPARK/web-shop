import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

import {
  handleOAuthCallback
} from './auth.controller';

const router = Router();

// 예: 구글 로그인 콜백 처리
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'], 
  prompt: 'select_account'
}));
router.get('/google/callback', handleOAuthCallback('google'));

// 카카오, 깃허브도 같은 방식으로 변경
router.get('/kakao', passport.authenticate('kakao', {
  prompt: 'login'
}));
router.get('/kakao/callback', handleOAuthCallback('kakao'));

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', handleOAuthCallback('github'));

export default router;