import { ObjectId } from 'mongoose';
import { EntityBase } from './EntityBase';
import { League } from './League';
import { Team } from './Team';
import { HalfTimeScore } from './enum/HalfTimeScore';

export interface Fixture extends EntityBase {
  referee: string;
  stadium: string;
  kickOffDate: Date;
  league: ObjectId | League;
  homeTeam: Team;
  awayTeam: Team;

  // Score fields (will be set after the fixture has been played)
  actualHomeScore?: number;
  actualAwayScore?: number;
  actualHalfTimeScore?: HalfTimeScore;
}
