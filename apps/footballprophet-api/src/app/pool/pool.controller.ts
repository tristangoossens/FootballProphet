import { Pool, UserRole } from '@footballprophet/domain';
import { Body, Controller, Request, Get, Param, UseGuards, Post, Put, Delete, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose/lib/types';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/user.service';
import { PoolService } from './pool.service';

@ApiTags('Pool')
@Controller('pools')
export class PoolController {
    constructor(
        private readonly poolService: PoolService,
        private readonly userService: UserService,
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

        const poolDocument = await this.poolService.Create(pool);
        await this.userService.addPool(req.user._id, poolDocument._id);
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
    async delete(@Request() req, @Param('id') id: ObjectId) {
        await this.poolService.Delete(id);
        await this.userService.removePool(req.user._id, id);
        return `Pool (${id}) has successfully been deleted`;
    }

    @HasRoles([UserRole.User])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':id/join')
    async join(@Request() req, @Param('id') id: ObjectId) {
        Logger.log(`User (${req.user._id}) is joining pool (${id})`, 'PoolController');
        await this.poolService.Join(id, req.user._id);
        await this.userService.addPool(req.user._id, id);
        return `User (${req.user._id}) has successfully joined pool (${id})`;
    }
}
