import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueSchema } from '../league/league.model';
import { TeamService } from '../team/team.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'leagues', schema: LeagueSchema }]),
  ],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
