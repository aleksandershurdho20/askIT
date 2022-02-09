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
    // Virtuals
    imageUrl: string
    bannerUrl: string
}