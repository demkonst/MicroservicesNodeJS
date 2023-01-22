import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  getErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: this.message }];
  }
}