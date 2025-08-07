import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET!;
if (!jwtSecret) throw new Error("JWT_SECRET가 .env에 설정되지 않았습니다.");

export function signJwt(payload: object): string {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

export function verifyJwt(token: string): any {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    return null;
  }
}