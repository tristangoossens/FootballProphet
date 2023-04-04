import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.model';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PoolController } from './pool.controller';
import { PoolSchema } from './pool.model';
import { PoolService } from './pool.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'pools', schema: PoolSchema }]),
        MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
        UserModule
    ],
    controllers: [PoolController],
    providers: [PoolService, UserService],
    exports: [PoolService]
})
export class PoolModule { }