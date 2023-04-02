import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { LeagueModule } from './league/league.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    MongooseModule.forRoot('mongodb://localhost:27017/footballprophet'),
    AuthModule,
    UserModule,
    LeagueModule,
  ],
})
export class AppModule {
  constructor(@InjectConnection() private conn: Connection) {}
}
