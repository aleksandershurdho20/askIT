import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
import { createSub, getSub, uploadSubImage, getPopularSubs } from "../controllers/sub";
import { upload } from '../middlewares/multer'
import { ownSub } from '../middlewares/ownSub';

const router = Router()


router.get('/popular', getPopularSubs)
router.post('/create', authenticatedUser, createSub)
router.get('/:name', authenticatedUser, getSub)
router.post('/:name/image', authenticatedUser, ownSub, upload.single('file'), uploadSubImage)
export default router