import { Request, Response } from "express";
import Post from "../entities/Post";

export const createPost = async (req: Request, res: Response) => {
    const { title, body, sub } = req.body
    const user = res.locals.user
    if (title.trim() === '') {
        return res.status(400).json({ message: 'Title must not be empty!' })
    }
    try {
        const post = new Post({ title, body, user, subName: sub })
        await post.save()
        return res.json(post)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong! ' })
    }
}