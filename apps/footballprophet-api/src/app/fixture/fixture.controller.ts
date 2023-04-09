import { Fixture, League, Team, UserRole } from '@footballprophet/domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LeagueService } from '../league/league.service';
import { FixtureService } from './fixture.service';

@ApiTags('Fixture')
@Controller('fixtures')
export class FixtureController {
  constructor(
    private readonly fixtureService: FixtureService,
    private readonly leagueService: LeagueService
  ) {}

  @HasRoles([UserRole.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() fixture: Fixture): Promise<string> {
    const fixtureDocument = await this.fixtureService.Create(fixture);

    // Add a reference to the fixture in the league
    await this.leagueService.AddFixtureReference(
      fixture.league as mongoose.Types.ObjectId,
      fixtureDocument._id
    );
    return `Fixture has been created`;
  }

  @HasRoles([UserRole.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() fixture: Fixture
  ): Promise<string> {
    await this.fixtureService.Update(id as mongoose.Types.ObjectId, fixture);
    return `Fixture has been scored`;
  }
}
