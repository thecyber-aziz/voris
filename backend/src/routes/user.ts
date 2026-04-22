import express from 'express';
import { isAuthme, login, logout, signup, googleLogin } from '../controllers/user';
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/google-login', googleLogin)
router.get('/logout', logout)
router.get('/me', isAuthme)

export default router;