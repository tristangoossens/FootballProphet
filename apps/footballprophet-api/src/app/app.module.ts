import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { LeagueModule } from './league/league.module';
import { FixtureModule } from './fixture/fixture.module';
import { PoolModule } from './pool/pool.module';
import { Neo4jService } from './neo4j/neo4j.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/footballprophet'),
    AuthModule,
    FixtureModule,
    UserModule,
    LeagueModule,
    PoolModule,
  ],
  providers: [Neo4jService],
  exports: [Neo4jService],
})
export class AppModule {
  constructor(@InjectConnection() private conn: Connection) {}
}
