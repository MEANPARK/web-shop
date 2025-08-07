import express from "express";
import { authenticateJwt } from '../auth/auth.middleware';
const router = express.Router();
import { 
    loginUser, 
    createUser, 
    logout, 
    getCurrentUser
} from "./user.controller";

router.route('/login')
.post(loginUser);

router.route('/register')
.post(createUser);

router.route('/logout')
.post(logout);

router.route('/me')
.get(authenticateJwt, getCurrentUser);

export default router;