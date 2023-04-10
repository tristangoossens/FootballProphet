import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '@footballprophet/domain';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Token does not expire
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: User) {
    return {
      ...payload,
    };
  }
}
