import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { PasswordManager } from '../services/password-manager';

const router = express.Router();

router.post('/api/users/signin', [
  body('email').isEmail(),
  body('password').trim().notEmpty()
],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await PasswordManager.compare(user.password, password);

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const userJwt = jwt.sign({
      sub: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
      jwt: userJwt
    };

    res.status(200).send(user);
  });

export { router as signinRouter };
