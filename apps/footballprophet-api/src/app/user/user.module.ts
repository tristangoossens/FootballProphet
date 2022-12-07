import { User } from '@footballprophet/domain';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
