
import { Request, Response } from 'express'
import { User } from '../entities/User'
import { validate } from 'class-validator'

const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body
    try {
        const user = new User({ email, username, password })
        const emailExist = await User.findOne({ email })
        const userNameExist = await User.findOne({ username })
        if (emailExist) res.status(400).json({ message: "Email exit" })
        if (userNameExist) res.status(400).json({ message: "Username exit" })
        const errors = await validate(user)
        if (errors.length > 0) res.status(400).json({ message: errors })
        await user.save()

        return res.json({ user })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
export default register