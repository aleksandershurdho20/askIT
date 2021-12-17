import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express'
import morgan from "morgan";
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
require("dotenv").config();

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
    res.json({ msg: 'hi' })
})
app.listen(8000, async () => {
    console.log('running at 5000')
    try {
        await createConnection()
        console.log('db connected ')
    } catch (error) {
        console.log('error', error)

    }
})