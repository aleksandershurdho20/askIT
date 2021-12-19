
import { Request, Response } from 'express'
import { User } from '../entities/User'
import { validate } from 'class-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
export const register = async (req: Request, res: Response) => {
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
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const passwordMatches = await bcrypt.compare(password, user.password)
        if (!passwordMatches) return res.status(401).json({ message: 'Password is incorrect' })
        const token = jwt.sign({ username }, process.env.JWT_SECRET)
        res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/',

        }))
        return res.json({ user })
    } catch (error) {
        res.status(500).json({ message: error })

    }
}

export const getAuthenticatedUser = async (_: Request, res: Response) => {
    console.log(res.locals.user,'okko')
   return res.json(res.locals.user)

  
}

export const logout = (_: Request, res: Response) => {
    res.set('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
    }))
    return res.status(200).json({ message: 'Logout succesfully!' })
}