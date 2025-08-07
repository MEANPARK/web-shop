import express from "express";
import { ErrorRequestHandler } from 'express';
import sequelize from './config/sequelizeDB.config';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'sequelize';
import passport from './modules/auth'; // passport.use(...)만 정의된 파일

//router
import userRouter from './modules/user/user.routes';
import authRouter from './modules/auth/auth.routes';
import productRouter from './modules/product/product.routes';
import cartRouter from './modules/cart/cart.routes';
import orderRouter from './modules/orders/orders.routes';

// 모델 관계
import './modules/associations';

// 전략 등록
import './modules/auth/strategies/google.strategy';
import './modules/auth/strategies/github.strategy';
import './modules/auth/strategies/kakao.strategy';

const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

// 라우터 등록
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// 에러 핸들러
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack || err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || '서버 오류 발생',
  });
};
app.use(errorHandler);


// Sequelize와 DB 동기화
// force: true (주의!) -> 기존 테이블 삭제 후 재생성(테스트 상황)
// alter: true -> 기존 테이블은 유지 스키마를 데이터베이스에 맞춰 수정
sequelize.sync({ force: true, logging: false })
.then(() => {
    console.log('✅ 테이블이 생성되었습니다!');
})
.catch((err: ValidationError) => {
    console.error('❌ 테이블 생성 실패:', err);
});

app.listen(3000, () => {
    console.log('서버 실행중');
});