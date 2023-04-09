import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PoolService } from './pool.service';

@Injectable()
export class PoolGuard implements CanActivate {
  constructor(private poolService: PoolService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check wheter the user is the owner of a pool
    const { user } = context.switchToHttp().getRequest();
    const { id } = context.switchToHttp().getRequest().params;
    const pool = await this.poolService.GetById(id);

    return pool?.owner._id == user._id;
  }
}
