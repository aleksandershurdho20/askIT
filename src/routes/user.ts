import { Router } from "express";
import { register, login, getAuthenticatedUser, logout, requestPasswordReset, resetPassword } from "../controllers/auth";
import { authenticatedUser } from "../middlewares/auth";
import trim from "../middlewares/trim";
import { getUserSubmissions } from '../controllers/user'
const router = Router();

router.get('/:username', authenticatedUser, getUserSubmissions)

export default router