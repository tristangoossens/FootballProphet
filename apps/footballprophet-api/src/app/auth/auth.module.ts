import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Neo4jService } from '../neo4j/neo4j.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: '8aP3RVdLvgpj8Mf',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Neo4jService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
