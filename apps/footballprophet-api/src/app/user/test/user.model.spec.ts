import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { UserDocument, UserSchema } from '../user.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('POOL SCHEMA TESTS', () => {
  let userModel: Model<UserDocument>;
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongoMemoryServer = await MongoMemoryServer.create();
            return {
              uri: mongoMemoryServer.getUri(),
            };
          },
        }),
        MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
      ],
    }).compile();

    userModel = app.get<Model<UserDocument>>(getModelToken('users'));
  });

  it('Missing required user username should throw an exception', async () => {
    // Arrange/Act
    const user = new userModel({
      // Missing username
      password: 'Test123!',
      birthDate: new Date(),
      avatarUrl: 'https://avatars.githubusercontent.com/u/45670281?v=4',
      phonenumber: '1234567890',
      roles: ['User', 'Admin'],
      // predictions and pools are not required
    });

    // Assert
    await expect(user.validate()).rejects.toThrow();
  });

  it('Missing required user password should throw an exception', async () => {
    // Arrange/Act
    const user = new userModel({
      username: 'TestUser',
      // Missing password
      birthDate: new Date(),
      avatarUrl: 'https://avatars.githubusercontent.com/u/45670281?v=4',
      phonenumber: '1234567890',
      roles: ['User', 'Admin'],
      // predictions and pools are not required
    });

    // Assert
    await expect(user.validate()).rejects.toThrow();
  });

  it('Missing required user birthDate should throw an exception', async () => {
    // Arrange/Act
    const user = new userModel({
      username: 'TestUser',
      password: 'Test123!',
      // Missing birthDate
      avatarUrl: 'https://avatars.githubusercontent.com/u/45670281?v=4',
      phonenumber: '1234567890',
      roles: ['User', 'Admin'],
      // predictions and pools are not required
    });

    // Assert
    await expect(user.validate()).rejects.toThrow();
  });

  it('Missing required user avatarUrl should throw an exception', async () => {
    // Arrange/Act
    const user = new userModel({
      username: 'TestUser',
      password: 'Test123!',
      birthDate: new Date(),
      // Missing avatarUrl
      phonenumber: '1234567890',
      roles: ['User', 'Admin'],
      // predictions and pools are not required
    });

    // Assert
    await expect(user.validate()).rejects.toThrow();
  });

  it('Missing required user phonenumber should throw an exception', async () => {
    // Arrange/Act
    const user = new userModel({
      username: 'TestUser',
      password: 'Test123!',
      birthDate: new Date(),
      avatarUrl: 'https://avatars.githubusercontent.com/u/45670281?v=4',
      // Missing phonenumber
      roles: ['User', 'Admin'],
      // predictions and pools are not required
    });

    // Assert
    await expect(user.validate()).rejects.toThrow();
  });

  it('Valid user should not throw an exception', async () => {
    // Arrange/Act
    const user = new userModel({
      username: 'TestUser',
      password: 'Test123!',
      birthDate: new Date(),
      avatarUrl: 'https://avatars.githubusercontent.com/u/45670281?v=4',
      phonenumber: '1234567890',
      // predictions and pools are not required
    });

    // Assert
    await expect(user.validate()).resolves.not.toThrow();
  });
});
