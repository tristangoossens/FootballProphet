import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FixtureService } from '../fixture/fixture.service';
import { LeagueSchema } from '../league/league.model';
import { LeagueModule } from '../league/league.module';
import { LeagueService } from '../league/league.service';
import { FixtureController } from './fixture.controller';
import { FixtureSchema } from './fixture.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'fixtures', schema: FixtureSchema }]),
    MongooseModule.forFeature([{ name: 'leagues', schema: LeagueSchema }]),
    LeagueModule
  ],
  controllers: [FixtureController],
  providers: [FixtureService, LeagueService],
  exports: [FixtureService],
})
export class FixtureModule { }
