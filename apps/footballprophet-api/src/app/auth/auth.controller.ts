import { User, UserRole } from '@footballprophet/domain';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { HasRoles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RolesGuard } from './guards/roles.guard';

@ApiTags('Authentication')
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
    // TODO: Add roles through frontend
    user.roles = [UserRole.Admin, UserRole.User];

    await this.userService.create(user);
    return `Gebruiker aangemaakt met gebruikersnaam '${user.username}'`;
  }
}