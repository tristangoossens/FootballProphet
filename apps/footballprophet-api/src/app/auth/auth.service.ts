import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import { User } from '@footballprophet/domain';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.findOne(email);
        if (user && user.password === pass) {
            delete user.password;
            return user;
        }
        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({
                username: user.email,
                sub: user.id,
                roles: user.roles
            }),
            expires_in: '2h'
        }
    }
}
