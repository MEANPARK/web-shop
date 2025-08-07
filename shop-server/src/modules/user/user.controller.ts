import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import { User } from '../associations';
import bcrypt from 'bcrypt';
import { signJwt, verifyJwt } from '../../utils/jwt.utils';
import dotenv from 'dotenv';
dotenv.config();

// POST /login
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    res.status(400).json({ success: false, message: "존재하지 않는 사용자입니다." });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    return;
  }

  const token = signJwt({ id: user.id }); //유효기간 1일

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //자동으로 설정 
    sameSite: "lax", //CSRF 공격 방지
  });

  res.json({ success: true, message: "로그인 성공", user: { id: user.id, username: user.username } });
});

// POST /register
export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, password, password2 } = req.body;

  const exist = await User.findOne({ where: { username } });
  if (exist) {
    res.status(400).json({ success: false, message: "이미 존재하는 사용자입니다." });
    return;
  }

  if (password !== password2) {
    res.status(400).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, provider:"local"});

  res.status(201).json({ success: true, message: "회원가입 성공", user: { id: user.id, username: user.username } });
});

// POST /logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true, message: "로그아웃 완료" });
};

// GET /users/me
export const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;

  if (!userId) {
    res.status(401).json({ success: false, message: '인증되지 않은 사용자입니다.' });
    return;
  }

  const user = await User.findByPk(userId, {
    attributes: ['id', 'username', 'email', 'provider'], // 필요에 따라 필드 조절
  });

  if (!user) {
    res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    return;
  }

  res.json({ success: true, user });
});
