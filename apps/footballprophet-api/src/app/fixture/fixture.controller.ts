import { Fixture, League, Team, UserRole } from '@footballprophet/domain';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FixtureService } from './fixture.service';

@Controller('fixtures')
export class FixtureController {
    constructor(
        private readonly fixtureService: FixtureService,
    ){ }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() fixture: Fixture): Promise<string> {
        await this.fixtureService.Create(fixture);
        return `Fixture has been created`;
    }

    @HasRoles([UserRole.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    async update(@Body() fixture: Fixture): Promise<string> {
        await this.fixtureService.Update(fixture);
        return `Fixture has been updated`;
    }
}
