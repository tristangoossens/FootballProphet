import { User, UserRole } from '@footballprophet/domain';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserDocument, UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('users') private userModel: Model<UserDocument>
    ){}

    async listUsers() {
        console.log(this.userModel.find())
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username: username }).lean();
    }

    async create() {
        const user = await this.userModel.create({
            username: 'tristan@mail.nl',
            password: 'Test123!',
            birthDate: new Date('2002-04-02'),
            phonenumber: '061234567',
            role: UserRole.Admin,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await user.save()
    }
}
