import { createPost } from "../controllers/post";
import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
const router = Router()


router.post('/create', authenticatedUser, createPost)
export default router