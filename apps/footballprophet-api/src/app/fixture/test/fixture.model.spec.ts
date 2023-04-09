import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from '@nestjs/testing';
import { FixtureDocument, FixtureSchema } from '../fixture.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('FIXTURE SCHEMA TESTS', () => {
  let fixtureModel: Model<FixtureDocument>;
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
        MongooseModule.forFeature([
          { name: 'fixtures', schema: FixtureSchema },
        ]),
      ],
    }).compile();

    fixtureModel = app.get<Model<FixtureDocument>>(getModelToken('fixtures'));
  });

  it('Missing required fixture league reference should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      // Missing league reference
      referee: 'Test referee',
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      homeTeam: {
        name: 'Test home team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture league reference should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      // Missing referee
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      homeTeam: {
        name: 'Test home team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture stadium should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      // Missing stadium
      kickOffDate: new Date(),
      homeTeam: {
        name: 'Test home team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture kickOffDate should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      stadium: 'Test stadium',
      // kickOffDate is missing
      homeTeam: {
        name: 'Test home team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture homeTeam should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      // homeTeam is missing
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture awayTeam should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      homeTeam: {
        name: 'Test home team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // awayTeam is missing
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture homeTeam.name should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      homeTeam: {
        // name is missing
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture homeTeam.logoUrl should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      homeTeam: {
        name: 'Test home team',
        // logoUrl is missing
        foundedIn: new Date(),
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Missing required fixture homeTeam.foundedIn should throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      homeTeam: {
        name: 'Test home team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        // foundedIn is missing
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).rejects.toThrow();
  });

  it('Valid fixture should not throw an exception', async () => {
    // Arrange/Act
    const fixture = new fixtureModel({
      league: '6432c78bf6f2ccf974a36236',
      referee: 'Test referee',
      stadium: 'Test stadium',
      kickOffDate: new Date(),
      homeTeam: {
        name: 'Test home team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      awayTeam: {
        name: 'Test away team',
        logoUrl:
          'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
        foundedIn: new Date(),
      },
      // actualHalfTimeScore, actualHomeScore, actualAwayScore are not required
    });

    // Assert
    await expect(fixture.validate()).resolves.not.toThrow();
  });
});
