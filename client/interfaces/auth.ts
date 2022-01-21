interface User {
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

export interface authInterface {
    authenticated: boolean,
    user: User | null,
    loading: boolean
}