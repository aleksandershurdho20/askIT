import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../entities/Comment";
import Post from "../entities/Post";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";

export const createVote = async (req: Request, res: Response) => {
    const { identifier, slug, commentIdentifier, value } = req.body;
    const votes = [-1, 0, 1]
    if (!votes.includes(value)) {
        return res.status(400).json({ message: "Value must be -1,0 or 1" })
    }
    try {
        const user: User = res.locals.user
        let post = await getRepository(Post).findOneOrFail({ identifier, slug })
        let vote: Vote | undefined
        let comment: Comment | undefined
        if (commentIdentifier) {
            // if there is a comment id, find vote by comment
            comment = await getRepository(Comment).findOneOrFail({ identifier: commentIdentifier })
        }
        else {
            // find vote by post
            vote = await getRepository(Vote).findOne({ user, post })

        }
        if (!vote && value === 0) {
            return res.status(404).json({ error: "Vote not found" })
        }
        else if (!vote) {
            // if no vote create it 
            vote = await getRepository(Vote).create({ user, value })
            if (comment) {
                vote.comment = comment
            } else {
                vote.post = post
                await getRepository(Vote).save(vote)

            }
        }
        else if (value === 0) {
            // if vote exist and value 0  remove it
            await getRepository(Vote).remove(vote);
        }
        else if (vote.value !== value) {
            // if vote and value has changed , update vote
            vote.value = value;
            await getRepository(Vote).save(vote)
        }
        post = await getRepository(Post).findOne({ identifier, slug }, { relations: ['comments', 'sub', 'votes'] })
        return res.json({ post })
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });

    }
}