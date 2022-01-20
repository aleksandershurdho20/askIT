import { Request, Response, NextFunction } from 'express';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { User } from '../entities/User';
export const authenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error('Unauthenticated!');
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getRepository(User).findOne({ email })
    if (!user) throw new Error('Unauthenticated!')
    res.locals.user = user
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
