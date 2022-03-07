import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Comment } from '../entities/Comment'
import Post from '../entities/Post'
import { User } from '../entities/User'


export const getUserSubmissions = async (req: Request, res: Response) => {
    const { username } = req.params
    try {
        const user = await getRepository(User).findOneOrFail({
            where: {
                username
            },
            select: ['username', 'createAt']
        })
        const posts = await getRepository(Post).find({
            where: {
                user
            },
            relations: ['comments', 'votes', 'sub']
        })

        const comments = await getRepository(Comment).find({
            where: {
                user
            },
            relations: ['post']
        })
        if (res.locals.user) {
            posts.forEach(p => p.setUserVote(res.locals.user))
            comments.forEach(c => c.setUserVote(res.locals.user))

        }
        let submissions: any[] = []
        posts.forEach(p => submissions.push({ type: 'Post', ...p.toJSON() }))
        comments.forEach(c => submissions.push({ type: 'Comment', ...c.toJSON() }))
        submissions.sort((a, b) => {
            if (b.createAt > a.createAt) return 1
            if (b.createAt < a.createAt) return -1

            return 0

        })

        return res.json({ user, submissions })

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}