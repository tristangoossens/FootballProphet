import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeagueSchema } from './league.model';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'leagues', schema: LeagueSchema }]),
  ],
  providers: [LeagueService],
  exports: [LeagueService],
  controllers: [LeagueController],
})
export class LeagueModule {}
