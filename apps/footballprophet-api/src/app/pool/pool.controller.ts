import { Pool, UserRole } from '@footballprophet/domain';
import { Body, Controller, Request, Get, Param, UseGuards, Post, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PoolService } from './pool.service';

@ApiTags('Pool')
@Controller('pools')
export class PoolController {
    constructor(
        private readonly poolService: PoolService
    ) { }

    @HasRoles([UserRole.User])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll(@Request() req) {
        return await this.poolService.GetAll(req.user._id);
    }

    @HasRoles([UserRole.User])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getById(@Param('id') id: ObjectId) {
        return await this.poolService.GetById(id);
    }

    @HasRoles([UserRole.User])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Request() req, @Body() pool) {
        // Set owner to current user
        pool.owner = req.user._id;

        // Owner is also a member
        pool.members = [req.user._id];

        await this.poolService.Create(pool);
        return `Pool ${pool.name} has successfully been created`;
    }

    @HasRoles([UserRole.User])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    async update(@Param('id') id: ObjectId, @Body() pool: Pool) {
        await this.poolService.Update(id, pool);
        return `Pool ${pool.name} has successfully been updated`;
    }

    @HasRoles([UserRole.User])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id') id: ObjectId) {
        await this.poolService.Delete(id);
        return `Pool (${id}) has successfully been deleted`;
    }
}
