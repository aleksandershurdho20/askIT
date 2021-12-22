import { Request, Response } from "express";
import Post from "../entities/Post";
import Sub from "../entities/Sub";

export const createPost = async (req: Request, res: Response) => {
    const { title, body, sub } = req.body
    const user = res.locals.user
    if (title.trim() === '') {
        return res.status(400).json({ message: 'Title must not be empty!' })
    }
    try {
        const subRecord = await Sub.findOneOrFail({ name: sub })
        const post = new Post({ title, body, user, sub: subRecord })
        await post.save()
        return res.json(post)
    } catch (error) {
        console.log(error, 'ok')
        res.status(500).json({ message: 'Something went wrong! ' })
    }
}


export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find({
            order: {
                createAt: 'DESC'
            },
        })
        return res.json(posts)
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!' })
    }
}


export const getPost = async (req: Request, res: Response) => {
    const { identifier, slug } = req.params

    try {
        const post = await Post.findOneOrFail({
            identifier, slug
        })
        res.json(post)
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong!' })

    }
}