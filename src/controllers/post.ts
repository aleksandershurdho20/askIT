import { Request, Response } from 'express';
import Post from '../entities/Post';
import Sub from '../entities/Sub';
import { Comment } from '../entities/Comment';

import { getRepository } from "typeorm";

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;
  const postRepository = getRepository(Post)
  const subRepository = getRepository(Sub)

  const user = res.locals.user;
  if (title.trim() === '') {
    return res.status(400).json({ message: 'Title must not be empty!' });
  }
  try {
    const subRecord = await subRepository.findOneOrFail({ name: sub })
    const post = postRepository.create({ title, body, user, sub: subRecord })
    await postRepository.save(post)
    return res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong! ' });
  }
};

export const getPosts = async (_: Request, res: Response) => {
  const postRepository = getRepository(Post)

  try {
    const posts = await postRepository.find({
      order: {
        createAt: 'DESC',
      },
      relations: ['comments', 'votes', 'sub']
    })
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const postRepository = getRepository(Post)

  try {
    const post = await postRepository.findOneOrFail({
      identifier, slug
    }, {
      relations: ['comments', 'votes', 'sub'],
    })
    res.json(post)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};



export const createPostComment = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params
  const { body } = req.body
  try {
    const post = await getRepository(Post).findOneOrFail({ identifier, slug })

    const comment = getRepository(Comment).create({
      body,
      user: res.locals.user,
      post
    })
    await getRepository(Comment).save(comment)

    res.json(comment)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong!' });

  }
}



export const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params
  try {
    const post = await getRepository(Post).findOneOrFail({ identifier, slug })

    const comments = await getRepository(Comment).find({
      where: { post },
      order: { createAt: 'DESC' },
      relations: ['votes']
    })

    if (res.locals.user) {
      comments.forEach((c) => c.setUserVote(res.locals.user))
    }

    return res.json(comments)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}


export const updatePost = async (req: Request, res: Response) => {
  const { name } = req.params
  const { username, body, ...rest } = req.body
  try {
    const post = await getRepository(Post)
      .createQueryBuilder("user")
      .update({ body })
      // .set({ body })
      .where("user.identifier =:name", {
        identifier: name,

      })
      .execute()


    res.json({ message: "Post updated succesfully", post })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Something went wrong' })

  }


}