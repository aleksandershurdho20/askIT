import { createPost, getPosts, getPost } from "../controllers/post";
import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
const router = Router()


router.post('/create', authenticatedUser, createPost)
router.get('/get', getPosts)
router.get('/:identifier/:slug', getPost)

export default router