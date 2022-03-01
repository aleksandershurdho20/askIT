import { Request, Response } from 'express';
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';
import cookie from 'cookie';
import { User } from '../entities/User';
import { getRepository, createQueryBuilder } from "typeorm";
import { usePasswordHashToMakeToken, getPasswordResetURL, resetPasswordTemplate, transporter, decoder as Decoder } from '../helpers/generateResetPasswordToken'
export const register = async (req: Request, res: Response) => {
  const userRepository = getRepository(User)
  const { email, username, password } = req.body;
  try {
    const user = userRepository.create({ email, username, password });
    const emailExist = await userRepository.findOne({ email });
    const userNameExist = await userRepository.findOne({ username });
    if (emailExist) res.status(400).json({ message: 'Email exit' });
    if (userNameExist) res.status(400).json({ message: 'Username exit' });
    const errors = await validate(user);
    if (errors.length > 0) res.status(400).json({ message: errors });
    await userRepository.save(user)
    return res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const login = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const userRepository = getRepository(User)

  try {
    const user = await userRepository.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(401).json({ message: 'Password is incorrect' });
    const token = jwt.sign({ email }, process.env.JWT_SECRET!);
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        // maxAge: 3600,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',

      })
    );
    return res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAuthenticatedUser = async (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

export const logout = (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );
  return res.status(200).json({ message: 'Logout succesfully!' });
};



export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const user = await getRepository(User).findOneOrFail({ email })
    if (user) {
      const token = usePasswordHashToMakeToken(user)
      const url = getPasswordResetURL(user, token)
      const emailTemplate = resetPasswordTemplate(user, url)
      const sendEmail = () => {
        transporter.sendMail(emailTemplate, (err, info) => {
          if (err) {
            console.log({ err })
            res.status(500).json("Error sending email")
          }
          else {
            res.json({ message: "Email send succesfully!" })

          }
        })
      }
      sendEmail()
    }

  } catch (error) {

    res.status(404).json({ message: "Email not found!" })

  }
}


export const resetPassword = async (req: Request, res: Response) => {
  const { password, token, email } = req.body
  try {
    const user = await getRepository(User).findOneOrFail({ email })
    const decoder = jwt.decode(token)
    if (user) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const updated = await getRepository(User).createQueryBuilder()
        .update({ password: hashedPassword })
        // .set({ password: hashedPassword })
        // .where('email = "email', { email })
        .execute()
      if (updated) {
        res.json({ message: "Password changed succesfully" })
      }


    }
    console.log(decoder, user, password)

  } catch (error) {
    res.status(500).json({ message: error });
  }
}