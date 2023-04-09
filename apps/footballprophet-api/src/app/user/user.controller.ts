import {
  League,
  Prediction,
  Team,
  User,
  UserRole,
} from '@footballprophet/domain';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PredictionService } from '../prediction/prediction.service';
import { UserService } from './user.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { SuggestedPool } from 'libs/domain/src/lib/SuggestedPool';
import { PredictionGuard } from '../prediction/prediction.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly predictionService: PredictionService,
    private readonly neo4jService: Neo4jService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async profile(@Param('id') id: ObjectId): Promise<User> {
    const suggestedPools = await this.neo4jService.run(
      `MATCH (u:User)-[:MEMBER_OF]->(p:Pool)<-[:MEMBER_OF]-(otherUser:User)-[:MEMBER_OF]->(otherPool:Pool)
       WHERE u.id = '${id.toString()}' AND NOT (u)-[:MEMBER_OF]->(otherPool)
       RETURN otherPool.id, otherPool.name, otherPool.logoUrl, otherPool.isPrivate`
    );

    const user = await this.userService.find(id);

    return {
      ...(user._doc as User),
      suggestedPools: suggestedPools.map((suggestedPool) => {
        return {
          id: suggestedPool.get('otherPool.id'),
          name: suggestedPool.get('otherPool.name'),
          logoUrl: suggestedPool.get('otherPool.logoUrl'),
          isPrivate: suggestedPool.get('otherPool.isPrivate'),
        } as SuggestedPool;
      }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/scores')
  async scores(@Param('id') id: string): Promise<any> {
    return await this.userService.scores(id);
  }

  // Prediction methods
  @HasRoles([UserRole.User])
  @UseGuards(JwtAuthGuard, RolesGuard, PredictionGuard)
  @Post('predictions')
  async createPrediction(
    @Request() req,
    @Body() prediction: Prediction
  ): Promise<string> {
    await this.predictionService.CreatePrediction(req.user._id, prediction);
    return `Prediction has been created`;
  }
}
