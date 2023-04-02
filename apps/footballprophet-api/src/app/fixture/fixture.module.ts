import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FixtureService } from '../fixture/fixture.service';
import { FixtureSchema } from './fixture.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'fixtures', schema: FixtureSchema }]),
  ],  
  providers: [FixtureService],
  exports: [FixtureService],
})
export class FixtureModule {}
