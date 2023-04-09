import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@footballprophet/domain';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user.toJSON()),
    };
  }
}
