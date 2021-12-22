import { Response, Request } from "express";
import Sub from "../entities/Sub";
import User from "../entities/Users";
import { getRepository } from "typeorm";
import { isEmpty } from "class-validator";

export const createSub = async (req: Request, res: Response) => {
    const { name, title, description } = req.body

    const user: User = res.locals.user

    try {
        if (isEmpty(name)) res.json({ message: 'Name cannot be empty' })
        const sub = await getRepository(Sub)
            .createQueryBuilder('sub')
            .where('lower(sub.name) = :name', { name: name.toLowerCase })
            .getOne()
        if (sub) {
            res.status(400).json({ message: 'Sub already exist!' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })
    }

    try {
        const sub = new Sub({ name, title, description })
        await sub.save()
        return res.json(sub)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' })

    }
}