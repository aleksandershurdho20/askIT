import { Request, Response } from 'express';


export const createComment = (req: Request, res: Response) => {
    const { identifier, slug } = req.params
}
