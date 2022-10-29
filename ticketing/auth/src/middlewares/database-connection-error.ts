export class DatabaseConnectionError extends Error {
  reason = 'Error connctiong to database';

  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}