import { createPost, getPosts, getPost, createPostComment, getPostComments, updatePost } from "../controllers/post";
import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
const router = Router()


router.post('/create', authenticatedUser, createPost)
router.get('/get', getPosts)
router.get('/:identifier/:slug', getPost)
router.post('/:identifier/:slug/comments', authenticatedUser, createPostComment)
router.get('/:identifier/:slug/comments', authenticatedUser, getPostComments)
router.put("/update/:name", updatePost)
export default router