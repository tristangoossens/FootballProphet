import { User, UserRole } from '@footballprophet/domain';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
        return await this.userModel.findOne({ _id: id }).populate('pools').populate('predictions.fixture').lean();
    }

    async create(user: User) {
        // TODO: Hash password
        await this.userModel.create(user);
    }

    // Pool reference methods
    async addPool (userId: mongoose.Types.ObjectId, poolId: mongoose.Types.ObjectId) {
        await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { pools: poolId } });
    }

    async removePool (userId: mongoose.Types.ObjectId, poolId: mongoose.Types.ObjectId) {
        // TODO: A owner of a pool should not be able to remove himself from the pool
        await this.userModel.findOneAndUpdate({ _id: userId }, { $pull: { pools: poolId } });
    }
}
