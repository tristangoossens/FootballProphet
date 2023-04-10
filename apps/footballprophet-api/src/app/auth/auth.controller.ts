import { User, UserRole } from '@footballprophet/domain';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Neo4jService } from '../neo4j/neo4j.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

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
    user.roles = [UserRole.User];

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
