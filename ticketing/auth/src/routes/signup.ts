import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../middlewares/database-connection-error';
import { RequestValidationError } from '../middlewares/request-validation-error';

const router = express.Router();

router.post('/api/users/signup', [
  body('email').isEmail(),
  body('password').trim().isLength({ min: 4, max: 20 })
],
  (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    console.log(`Creating user ${email}`);

    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
