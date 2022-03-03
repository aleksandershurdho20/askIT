import { Post } from './postInterface'
export interface Comment {
    identifier: string
    body: string
    username: string
    createAt: string
    updateAt: string
    post?: Post
    // Virtuals
    userVote: number
    voteScore: number
}