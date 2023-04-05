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
  Delete,
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

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly predictionService: PredictionService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req): Promise<any> {
    return await this.userService.find(req.user._id);
  }

  // Prediction methods
  @HasRoles([UserRole.User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('predictions')
  async createPrediction(
    @Request() req,
    @Body() prediction: Prediction
  ): Promise<string> {
    await this.predictionService.CreatePrediction(req.user._id, prediction);
    return `Prediction has been created`;
  }

  @HasRoles([UserRole.User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('predictions/:id')
  async updatePrediction(
    @Request() req,
    @Param('id') predictionId: ObjectId,
    @Body() prediction: Prediction
  ): Promise<string> {
    await this.predictionService.UpdatePrediction(
      req.user._id,
      predictionId,
      prediction
    );
    return `Prediction has been updated`;
  }
}
