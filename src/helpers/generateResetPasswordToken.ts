import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
export const usePasswordHashToMakeToken = ({
    password: passwordHash,
    email,
    createAt
}) => {
    const secret = passwordHash + "-" + createAt
    const token = jwt.sign({ email }, secret, {
        expiresIn: 3600 // 1 hour
    })
    return token
}

export const getPasswordResetURL = (user, token) =>
    `http://localhost:3000/password/reset/${user.email}/${token}`

export const resetPasswordTemplate = (user, url) => {
    const from = process.env.EMAIL_LOGIN
    const to = user.email
    const subject = "🌻 askIT Password Reset 🌻"
    const html = `
    <p>Hey ${user.username},</p>
    <p>We heard that you lost your askIT password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>Do something outside today! </p>
    <p>–Your friends at askIT</p>
  `

    return { from, to, subject, html }
}

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',

    auth: {
        user: "",
        pass: ""
    }
})

export interface decoder {
    email: string,
    iat: string,
    exp: string
}