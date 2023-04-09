import { Test, TestingModule } from '@nestjs/testing';
import { LeagueService } from '../league.service';
import { LeagueController } from '../league.controller';
import { League } from '@footballprophet/domain';
import mongoose, { ObjectId } from 'mongoose';

describe('LEAGUE CONTROLLER TESTS', () => {
  let app: TestingModule;
  let leagueController: LeagueController;
  let leagueService: LeagueService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [LeagueController],
      providers: [
        {
          provide: LeagueService,
          useValue: {
            GetAll: jest.fn(),
            GetById: jest.fn(),
            Create: jest.fn(),
            Update: jest.fn(),
            AddTeamToLeague: jest.fn(),
          },
        },
      ],
    }).compile();

    leagueController = app.get<LeagueController>(LeagueController);
    leagueService = app.get<LeagueService>(LeagueService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Controller dependency should be defined', () => {
    expect(leagueController).toBeDefined();
  });

  it('getAll: Should return an array of leagues', async () => {
    const getLeagues = jest
      .spyOn(leagueService, 'GetAll')
      .mockImplementation(async () => []);

    const result = await leagueService.GetAll();

    expect(getLeagues).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it('getById: Should return a league', async () => {
    const league: League = {
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
        {
          name: 'Chelsea',
          logoUrl:
            'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
          foundedIn: new Date(),
        },
      ],
      fixtures: [],
    };

    const GetById = jest
      .spyOn(leagueService, 'GetById')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation(async () => league);

    const result = await leagueController.getById(
      mongoose.Types.ObjectId.createFromHexString(
        '64177204075a5a1a58d07a55'
      ) as any
    );

    expect(GetById).toBeCalledTimes(1);
    expect(result).toStrictEqual(league);
  });

  it('create: Should return a message', async () => {
    const league: League = {
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
        {
          name: 'Chelsea',
          logoUrl:
            'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
          foundedIn: new Date(),
        },
      ],
      fixtures: [],
    };

    // Arrange/Act
    const result = await leagueController.create(league);

    // Assert
    expect(result).toEqual(`League created with name '${league.name}'`);
  });

  it('update: Should return a message', async () => {
    const league: League = {
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
        {
          name: 'Chelsea',
          logoUrl:
            'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
          foundedIn: new Date(),
        },
      ],
      fixtures: [],
    };

    // Arrange/Act
    const id = mongoose.Types.ObjectId.createFromHexString(
      '64177204075a5a1a58d07a55'
    );
    const result = await leagueController.update(id as any, league);

    // Assert
    expect(result).toEqual(`League updated with id '${id}'`);
  });

  it('addTeamToLeague: Should return a message', async () => {
    const league: League = {
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
      fixtures: [],
    };

    const teamToAdd = {
      name: 'Chelsea',
      logoUrl: 'https://www.flashscore.com/res/image/empty-logo-team-share.gif',
      foundedIn: new Date(),
    };

    // Arrange
    league.teams.push(teamToAdd);
    const leagueId = mongoose.Types.ObjectId.createFromHexString(
      '64177204075a5a1a58d07a55'
    );

    // Act
    const result = await leagueController.addTeamToLeague(
      leagueId as any,
      teamToAdd
    );

    // Assert
    expect(result).toEqual(`Team added to league with id '${leagueId}'`);
  });
});
