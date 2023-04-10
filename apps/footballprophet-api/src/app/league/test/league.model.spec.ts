import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { LeagueDocument, LeagueSchema } from '../league.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('LEAGUE SCHEMA TESTS', () => {
  let leagueModel: Model<LeagueDocument>;
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
        MongooseModule.forFeature([{ name: 'leagues', schema: LeagueSchema }]),
      ],
    }).compile();

    leagueModel = app.get<Model<LeagueDocument>>(getModelToken('leagues'));
  });

  it('Missing required league name should throw exception', async () => {
    const league = new leagueModel({
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      season: 2020,
    });
    await expect(league.validate()).rejects.toThrow();
  });

  it('Missing required league logoUrl should throw exception', async () => {
    const league = new leagueModel({
      name: 'Test league',
      season: 2022,
    });
    await expect(league.validate()).rejects.toThrow();
  });

  it('Missing required league season should throw exception', async () => {
    const league = new leagueModel({
      name: 'Test league',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
    });
    await expect(league.validate()).rejects.toThrow();
  });

  it('Correct league info should create a league model', async () => {
    const league = await leagueModel.create({
      name: 'Test league',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      season: 2022,
    });
    expect(league).toBeDefined();
  });
});
