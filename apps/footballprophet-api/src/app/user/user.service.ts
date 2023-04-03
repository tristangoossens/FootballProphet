import { User, UserRole } from '@footballprophet/domain';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserDocument, UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('users') private userModel: Model<UserDocument>
    ) { }

    async findByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username: username }).lean();
    }

    async find(id: string): Promise<User | null> {
        return await this.userModel.findOne({ _id: id }).populate('predictions.fixture').lean();
    }

    async create(user: User) {
        // TODO: Hash password
        await this.userModel.create(user);
    }
}
