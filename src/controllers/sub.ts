import { Response, Request } from 'express';
import Sub from '../entities/Sub';
import { getRepository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { User } from '../entities/User';
import Post from '../entities/Post';
import multer from 'multer';
export const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};
    if (isEmpty(name)) errors.name = 'Name must not be empty';
    if (isEmpty(title)) errors.title = 'Title must not be empty';

    const sub = await getRepository(Sub)
      .createQueryBuilder('sub')
      .where('lower(sub.name) = :name', { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = 'Sub exists already';

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const sub = getRepository(Sub).create({ name, description, title, user })
    await getRepository(Sub).save(sub)
    return res.json(sub)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};


export const getSub = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const sub = await getRepository(Sub).findOneOrFail({ name })
    const posts = await getRepository(Post).find({
      where: { sub },
      order: { createAt: 'DESC' },
      relations: ['comments', 'votes']
    })
    sub.posts = posts
    if (res.locals.user) {
      sub.posts.forEach(p => p.setUserVote(res.locals.user))
    }
    res.json(sub)
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });

  }
}


export const uploadSubImage = async (req: Request, res: Response) => {
  try {
    res.json({ message: "Image Uploaded Succesfully" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })

  }
}