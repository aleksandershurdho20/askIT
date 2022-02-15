import { NextFunction, Request, Response, Router } from 'express'

import Sub from '../entities/Sub';

import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export const ownSub = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user

    try {
        const sub = await getRepository(Sub).findOneOrFail({ where: { name: req.params.name } })

        if (sub.username !== user.username) {
            return res.status(403).json({ error: 'You dont own this sub' })
        }

        res.locals.sub = sub
        return next()
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}