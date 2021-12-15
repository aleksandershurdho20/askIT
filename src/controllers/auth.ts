
import { Request, Response } from 'express'
import { User } from '../entities/User'


const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body
    try {
        const user = new User({ email, username, password })
        await user.save()
        return res.json({ user })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
export default register