import { MongoMemoryServer } from 'mongodb-memory-server';
import { LeagueService } from '../league.service';
import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { LeagueDocument, LeagueSchema } from '../league.model';
import mongoose, { Model } from 'mongoose';
import { MongoClient } from 'mongodb';
import { FixtureSchema } from '../../fixture/fixture.model';
import { League } from '@footballprophet/domain';

describe('LEAGUE SERVICE TESTS', () => {
  let service: LeagueService;
  let mongod: MongoMemoryServer;
  let mongoc: MongoClient;
  let leagueModel: Model<LeagueDocument>;

  let league1doc: LeagueDocument;
  let league2doc: LeagueDocument;

  beforeAll(async () => {
    let uri: string;

    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([{ name: 'leagues', schema: LeagueSchema }]),
        MongooseModule.forFeature([
          { name: 'fixtures', schema: FixtureSchema },
        ]),
      ],
      providers: [LeagueService],
    }).compile();

    service = app.get<LeagueService>(LeagueService);
    leagueModel = app.get<Model<LeagueDocument>>(getModelToken('leagues'));

    mongoc = new MongoClient(uri);
    await mongoc.connect();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('leagues').deleteMany({});

    // Create 2 leagues
    const premierLeague = await leagueModel.create({
      name: 'Premier League',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      season: 2022,
      teams: [
        {
          name: 'Arsenal',
          logoUrl:
            'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
          foundedIn: new Date(),
        },
      ],
    });

    const laLiga = await leagueModel.create({
      name: 'La Liga',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      season: 2022,
      teams: [
        {
          name: 'Real Madrid',
          logoUrl:
            'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
          foundedIn: new Date(),
        },
      ],
    });

    league1doc = await premierLeague.save();
    league2doc = await laLiga.save();
  });

  it('GetAll: Should return an array of leagues', async () => {
    const result = await service.GetAll();

    expect(result).toHaveLength(2);
  });

  it('GetById: Should return a league', async () => {
    const result = await service.GetById(league1doc._id);

    expect(result).toHaveProperty('name', 'Premier League');
  });

  it('Create: Should create and return a league', async () => {
    const eredivisie = {
      name: 'Eredivisie',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      season: 2022,
      teams: [
        {
          name: 'Ajax',
          logoUrl:
            'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
          foundedIn: new Date(),
        },
      ],
    };

    const result = await service.Create(eredivisie);

    expect(result).toBeDefined();
  });

  it('Update: Should update and return a league', async () => {
    const eredivisie: League = {
      name: 'Eredivisie', // Should be updated
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif', // Should be updated
      season: 2023, // Should be updated
    };

    const result = await service.Update(league1doc._id, eredivisie);
    expect(result.teams).toHaveLength(1);
  });
});
