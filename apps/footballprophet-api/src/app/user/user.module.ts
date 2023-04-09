import { User } from '@footballprophet/domain';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { PredictionService } from '../prediction/prediction.service';
import { UserController } from './user.controller';
import { UserModel, UserSchema } from './user.model';
import { UserService } from './user.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { FixtureService } from '../fixture/fixture.service';
import { FixtureSchema } from '../fixture/fixture.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'fixtures', schema: FixtureSchema }]),
  ],
  controllers: [UserController],
  providers: [PredictionService, FixtureService, UserService, Neo4jService],
  exports: [UserService],
})
export class UserModule {}
