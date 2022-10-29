import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
  body('email').isEmail(),
  body('password').trim().isLength({ min: 4, max: 20 })
],
  (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;
    console.log(`Creating user ${email}`);

    throw new Error('Error connecting to database');

    res.send({});
  }
);

export { router as signupRouter };
