export interface Post {
    identifier: string,
    title: string,
    body?: string,
    slug: string,
    subName: string,
    createAt: string,
    updatedAt: string,
    username: string,
    // virtual values
    url: string,
}