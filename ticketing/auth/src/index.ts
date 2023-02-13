import mongoose from 'mongoose';
import { app } from './app';

const start = async (): Promise<void> => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');

  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Auth is listening on port 3000');
  });
};

start().finally(() => { });