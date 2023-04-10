import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { PoolDocument, PoolSchema } from '../pool.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('POOL SCHEMA TESTS', () => {
  let poolModel: Model<PoolDocument>;
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
        MongooseModule.forFeature([{ name: 'pools', schema: PoolSchema }]),
      ],
    }).compile();

    poolModel = app.get<Model<PoolDocument>>(getModelToken('pools'));
  });

  it('Missing required pool league should throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      // Missing league
      name: 'Test pool name',
      description: 'Test pool description',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      isPrivate: false,
      owner: '5f9f1b9b9c9d1c0e8c8b8b8b',
      joinCode: '84207ba5-65ba-43a0-854c-cdba699c255e',
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).rejects.toThrow();
  });

  it('Missing required pool name should throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      league: '6432c736f6f2ccf974a36227',
      // Missing name
      description: 'Test pool description',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      isPrivate: false,
      owner: '5f9f1b9b9c9d1c0e8c8b8b8b',
      joinCode: '84207ba5-65ba-43a0-854c-cdba699c255e',
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).rejects.toThrow();
  });

  it('Missing required pool description should throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      league: '6432c736f6f2ccf974a36227',
      name: 'Test pool',
      // Missing description
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      isPrivate: false,
      owner: '5f9f1b9b9c9d1c0e8c8b8b8b',
      joinCode: '84207ba5-65ba-43a0-854c-cdba699c255e',
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).rejects.toThrow();
  });

  it('Missing required pool logoUrl should throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      league: '6432c736f6f2ccf974a36227',
      name: 'Test pool',
      description: 'Test pool description',
      // Missing logoUrl
      isPrivate: false,
      owner: '5f9f1b9b9c9d1c0e8c8b8b8b',
      joinCode: '84207ba5-65ba-43a0-854c-cdba699c255e',
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).rejects.toThrow();
  });

  it('Missing required pool isPrivate should throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      league: '6432c736f6f2ccf974a36227',
      name: 'Test pool',
      description: 'Test pool description',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      // Missing isPrivate
      owner: '5f9f1b9b9c9d1c0e8c8b8b8b',
      joinCode: '84207ba5-65ba-43a0-854c-cdba699c255e',
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).rejects.toThrow();
  });

  it('Missing required pool owner should throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      league: '6432c736f6f2ccf974a36227',
      name: 'Test pool',
      description: 'Test pool description',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      isPrivate: false,
      // Missing owner
      joinCode: '84207ba5-65ba-43a0-854c-cdba699c255e',
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).rejects.toThrow();
  });

  it('Missing required pool joinCode should throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      league: '6432c736f6f2ccf974a36227',
      name: 'Test pool',
      description: 'Test pool description',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      isPrivate: false,
      owner: '5f9f1b9b9c9d1c0e8c8b8b8b',
      // Missing joinCode
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).rejects.toThrow();
  });

  it('Valid pool should not throw an exception', async () => {
    // Arrange/Act
    const pool = new poolModel({
      league: '6432c736f6f2ccf974a36227',
      name: 'Test pool',
      description: 'Test pool description',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      isPrivate: false,
      owner: '5f9f1b9b9c9d1c0e8c8b8b8b',
      joinCode: '84207ba5-65ba-43a0-854c-cdba699c255e',
      members: ['5f9f1b9b9c9d1c0e8c8b8b8b'],
    });

    // Assert
    await expect(pool.validate()).resolves.not.toThrow();
  });
});
