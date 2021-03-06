import { Post } from "./postInterface";



export interface sub {
    createAt: string
    updatedAt: string
    name: string
    title: string
    description: string
    imageUrn: string
    bannerUrn: string
    username: string
    posts: Post[]
    postCount?: number
    // Virtuals
    imageUrl: string
    bannerUrl: string
}

export interface createSub {
    name: string,
    title: string,
    description: string,
    loading: boolean,

}