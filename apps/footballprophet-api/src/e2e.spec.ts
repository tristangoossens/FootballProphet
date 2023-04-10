import { INestApplication, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AuthModule } from './app/auth/auth.module';
import { LeagueModule } from './app/league/league.module';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import { disconnect } from 'mongoose';
import * as request from 'supertest';
import { League } from '@footballprophet/domain';
import { Neo4jService } from './app/neo4j/neo4j.service';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        mongod = await MongoMemoryServer.create();
        uri = mongod.getUri();
        return { uri };
      },
    }),
    AuthModule,
    LeagueModule,
  ],
  controllers: [],
  providers: [Neo4jService],
})
export class TestAppModule {}

describe.skip('LEAGUE TESTS (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let mongoc: MongoClient;
  let testLeagueId: string;
  let testLeague: League = {
    name: 'Premier League',
    season: 2022,
    logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
    teams: [],
    fixtures: [],
  };
  let server;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    // Init api
    app = moduleFixture.createNestApplication();
    await app.init();
    app.setGlobalPrefix('api');

    // Init mongo
    mongoc = new MongoClient(uri);
    await mongoc.connect();

    // Init server
    server = app.getHttpServer();

    // Init test data
    const testLeagueDocument = await mongoc
      .db('test')
      .collection('leagues')
      .insertOne(testLeague as any);

    testLeagueId = testLeagueDocument.insertedId.toString();
  });

  beforeEach(async () => {
    await mongoc.db('test').collection('leagues').deleteMany({});
  });

  afterAll(async () => {
    await app.close();
    await mongoc.close();
    await disconnect();
    await mongod.stop();
  });

  it('App should be defined', () => {
    expect(app).toBeDefined();
  });

  it('Should get a single league', async () => {
    const result = await request(server).get(`/leagues/${testLeagueId}`);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(testLeague);
  });

  it('Should return a 404 when a league is not found', async () => {
    const fakeId = '5f9f1b9f9f1b9f1b9f1b9f1b';
    const result = await request(server).get(`/leagues/${fakeId}`);

    expect(result.statusCode).toBe(404);
    expect(result.body.message).toBe('Resource not found');
  });
});
