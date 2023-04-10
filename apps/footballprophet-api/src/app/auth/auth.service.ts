import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
    try {
      const user = await this.userService.findByUsername(username);
      const valid = await bcrypt.compare(pass, user.password);

      if (valid) {
        delete user.password;
        return user;
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (AuthService -> validateUser): ${error.message}`
      );

      throw new HttpException(
        'Log in failed, please try again',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(user: any) {
    try {
      return {
        access_token: this.jwtService.sign(user.toJSON()),
      };
    } catch (error) {
      Logger.error(
        `⚠️: Something went wrong (AuthService -> login): ${error.message}`
      );

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
