import { Pool } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { PoolDocument } from './pool.model';

@Injectable()
export class PoolService {
    constructor(
        @InjectModel('pools') private poolModel: Model<PoolDocument>
    ) { }

    async GetAll(userId?: ObjectId) {
        // TODO: Filter private pools if user is not owner or member
        return await this.poolModel.find();
    }

    async GetById(id: ObjectId) {
        return await this.poolModel.findById(id).populate('members').populate('owner');
    }

    async Create(pool: Pool) {
        return await this.poolModel.create(pool);
    }

    async Update(id: ObjectId, pool: Pool) {
        // TODO: Check if user is owner of pool before updating

        return await this.poolModel.findByIdAndUpdate(
            // Filter
            {
                _id: id
            },

            // Update pool values (name, description, logoUrl, isPrivate)
            {
                $set: {
                    name: pool.name,
                    description: pool.description,
                    logoUrl: pool.logoUrl,
                    isPrivate: pool.isPrivate,
                }
            }
        );
    }

    async Delete(id: ObjectId) {
        // TODO: Check if user is owner of pool before deleting

        return await this.poolModel.findByIdAndDelete(id);
    }

    async Join(id: ObjectId, userId: ObjectId) {
        return await this.poolModel.findByIdAndUpdate(
            // Filter
            {
                _id: id
            },
            // Add user to members array
            {
                $addToSet: {
                    members: userId
                }
            }
        );
    }
}
