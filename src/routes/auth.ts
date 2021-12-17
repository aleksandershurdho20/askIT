import { Router } from "express";
import { register, login, getAuthenticatedUser, logout } from "../controllers/auth";
import trim from "../middlewares/trim";
const router = Router();
router.post('/register', trim, register)
router.post('/login', trim, login)
router.get('/user', getAuthenticatedUser)
router.get('/logout', logout)

export default router