import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express'
import morgan from "morgan";
import authRoutes from './routes/auth'
import postRoutes from './routes/post'
import subRoutes from './routes/sub'
import cookieParser from 'cookie-parser'
import cors from 'cors';

require("dotenv").config();

const app = express();
// app.use(cors());
// app.options('*', cors());  // enable pre-flight

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN,
        optionsSuccessStatus: 200,
    })
)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/sub', subRoutes)
app.get('/', (req, res) => {
    res.json({ msg: 'hi' })
})
app.listen(process.env.PORT || 8000, async () => {
    console.log('running at 5000')
    try {
        await createConnection()
        console.log('db connected ')
    } catch (error) {
        console.log('error', error)

    }
})