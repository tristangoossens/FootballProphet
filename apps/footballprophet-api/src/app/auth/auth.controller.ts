import { User, UserRole } from '@footballprophet/domain';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { HasRoles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { RolesGuard } from './guards/roles.guard';
import { Neo4jService } from '../neo4j/neo4j.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private neo4JService: Neo4jService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    // TODO: Add roles through frontend
    user.roles = [UserRole.Admin, UserRole.User];

    // Create a user in the database
    const userDocument = await this.userService.create(user);

    // Create a user in Neo4j
    await this.neo4JService.run(
      `CREATE (:User {id: '${userDocument._id.toString()}', username: '${
        user.username
      }'})`
    );

    return `Gebruiker aangemaakt met gebruikersnaam '${user.username}'`;
  }
}
