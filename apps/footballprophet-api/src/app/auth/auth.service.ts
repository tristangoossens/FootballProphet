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

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.userService.findByUsername(username);
        if (user && user.password === pass) {
            delete user.password;
            return user;
        }
        
        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign(user),
            expires_in: '2h'
        }
    }
}
