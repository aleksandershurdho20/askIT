import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
import { createSub, getSub } from "../controllers/sub";
const router = Router()


router.post('/create', authenticatedUser, createSub)
router.get('/:name', authenticatedUser, getSub)
export default router