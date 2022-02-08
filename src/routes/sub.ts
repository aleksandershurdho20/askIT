import { Router } from 'express'
import { authenticatedUser } from "../middlewares/auth";
import { createSub, getSub, uploadSubImage } from "../controllers/sub";
import { upload } from '../middlewares/multer'
const router = Router()


router.post('/create', authenticatedUser, createSub)
router.get('/:name', authenticatedUser, getSub)
router.post('/:name/image', authenticatedUser, upload.single('file'), uploadSubImage)
export default router