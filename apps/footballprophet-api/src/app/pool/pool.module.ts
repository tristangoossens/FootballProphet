import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoolController } from './pool.controller';
import { PoolSchema } from './pool.model';
import { PoolService } from './pool.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'pools', schema: PoolSchema }]),
    ],
    controllers: [PoolController],
    providers: [PoolService],
    exports: [PoolService]
})
export class PoolModule { }