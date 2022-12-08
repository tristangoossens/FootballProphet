import { User, UserRole } from '@footballprophet/domain';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { HasRoles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    await this.userService.create(user);
    return `Gebruiker aangemaakt met gebruikersnaam '${user.username}'`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req): Promise<User> {
    return await this.userService.find(req.user._id);
  }
}