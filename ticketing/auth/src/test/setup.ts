import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

// declare global {
//   namespace NodeJS {
//     export interface Global {
//       testSignup: () => Promise<string[]>
//     }
//   }
// }

// declare global {
// }

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

testSignup = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  return response.get("Set-Cookie")
}