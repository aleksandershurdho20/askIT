import { Router } from 'express'
import { createVote } from '../controllers/vote';
import { authenticatedUser } from "../middlewares/auth";


const router = Router();

router.post('/vote', authenticatedUser, createVote)

export default router