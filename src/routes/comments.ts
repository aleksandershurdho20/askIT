import { createComment } from "../controllers/comments";
import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
const router = Router()


router.post('/create', authenticatedUser, createComment)
router.get('/:identifier/:slug/comments', createComment)

export default router