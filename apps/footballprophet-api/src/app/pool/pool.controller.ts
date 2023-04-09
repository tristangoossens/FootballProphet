import { Pool, UserRole } from '@footballprophet/domain';
import {
  Body,
  Controller,
  Request,
  Get,
  Param,
  UseGuards,
  Post,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose/lib/types';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from '../user/user.service';
import { PoolService } from './pool.service';
import mongoose from 'mongoose';
import { Neo4jService } from '../neo4j/neo4j.service';
import { PoolGuard } from './pool.guard';

@ApiTags('Pool')
@Controller('pools')
export class PoolController {
  constructor(
    private readonly poolService: PoolService,
    private readonly userService: UserService,
    private readonly neo4jService: Neo4jService
  ) {}

  @Get()
  async getAll(@Request() req) {
    return await this.poolService.GetAll();
  }

  @Get(':id')
  async getById(@Param('id') id: ObjectId) {
    return await this.poolService.GetById(id);
  }

  @Get(':id/scoreboard')
  async getScoreboard(@Param('id') id: string) {
    const data = await this.poolService.GetScoreBoard(id);
    return data;
  }

  @HasRoles([UserRole.User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Request() req, @Body() pool) {
    // Set owner to current user
    pool.owner = req.user._id;

    // Owner is also a member
    pool.members = [req.user._id];

    // Create pool in database
    const poolDocument = await this.poolService.Create(pool);

    // Create a pool reference in user document
    await this.userService.addPool(req.user._id, poolDocument._id as ObjectId);

    // Create a pool in Neo4j
    await this.neo4jService.run(
      `CREATE (:Pool {id: '${poolDocument._id.toString()}', name: '${
        pool.name
      }', logoUrl: '${pool.logoUrl}', description: '${
        pool.description
      }', isPrivate: '${pool.isPrivate}'})`
    );

    // Create a relationship in Neo4j
    await this.neo4jService.run(
      `MATCH (u:User {id: '${req.user._id.toString()}'}), (p:Pool {id: '${poolDocument._id.toString()}'}) CREATE (u)-[:MEMBER_OF]->(p)`
    );

    return `Pool ${pool.name} has successfully been created`;
  }

  @HasRoles([UserRole.User])
  @UseGuards(JwtAuthGuard, RolesGuard, PoolGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() pool: Pool) {
    console.log('PoolController.update', pool);
    await this.poolService.Update(id, pool);
    return `Pool ${pool.name} has successfully been updated`;
  }

  @HasRoles([UserRole.User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id/join')
  async join(@Request() req, @Param('id') id: ObjectId) {
    // Create a reference in pool and user documents
    await this.poolService.Join(id, req.user._id);
    await this.userService.addPool(req.user._id, id);

    // Create a relationship in Neo4j
    await this.neo4jService.run(
      `MATCH (u:User {id: '${req.user._id.toString()}'}), (p:Pool {id: '${id.toString()}'}) CREATE (u)-[:MEMBER_OF]->(p)`
    );

    return `User (${req.user._id}) has successfully joined pool (${id})`;
  }

  @HasRoles([UserRole.User])
  @UseGuards(JwtAuthGuard, RolesGuard, PoolGuard)
  @Delete(':id/kick/:userId')
  async kick(@Param('id') id: ObjectId, @Param('userId') userId: ObjectId) {
    // Remove a reference in pool and user documents
    await this.poolService.Leave(id, userId);
    await this.userService.removePool(userId, id);

    // Remove a relationship in Neo4j
    await this.neo4jService.run(
      `MATCH (u:User {id: '${userId.toString()}'})-[m:MEMBER_OF]->(p:Pool {id: '${id.toString()}'})
       DELETE m`
    );

    return `User (${userId}) has successfully been kicked from pool (${id})`;
  }
}
