import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueSchema } from './league.model';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { TeamService } from '../team/team.service';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'leagues', schema: LeagueSchema }]),
    TeamModule
  ],
  providers: [LeagueService, TeamService],
  exports: [LeagueService],
  controllers: [LeagueController],
})
export class LeagueModule {}
