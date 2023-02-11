import { CustomError } from './custom-error';

export class UnauthorizedError extends CustomError {
  statusCode = 401;


  constructor() {
    super('NUnauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  getErrors() {
    return [{ message: 'Unauthorized' }];
  }
}