import { createPost } from "../controllers/post";
import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
const router = Router()


router.post('/api/posts', authenticatedUser, createPost)
export default router