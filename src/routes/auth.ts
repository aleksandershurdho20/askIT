import { Router } from "express";
import register from "../controllers/auth";
import trim from "../middlewares/trim";
const router = Router();
router.post('/register', trim, register)
export default router