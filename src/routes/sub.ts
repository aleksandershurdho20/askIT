import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
import { createSub } from "../controllers/sub";
const router = Router()


router.post('/create', authenticatedUser, createSub)
export default router