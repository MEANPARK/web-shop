import { verifyJwt } from '../../utils/jwt.utils';
import { Request, Response, NextFunction } from 'express';

export function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  // 1. 헤더에서 토큰 시도
  let token = null;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 2. 헤더 없으면 쿠키에서 시도
  if (!token) {
    token = req.cookies?.token;
  }

  if (!token) return res.status(401).send('Missing token');

  const user = verifyJwt(token);
  if (!user) return res.status(403).send('Invalid token');

  //console.log('Decoded JWT:', user);
  (req as any).user = user;
  next();
}