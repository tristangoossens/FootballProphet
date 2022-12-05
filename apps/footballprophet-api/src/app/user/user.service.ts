import { User, UserRole } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';
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

    async findOne(){
        return null;
    }

    async create() {
        const user = await this.userModel.create({
            email: 'tristan@mail.nl',
            password: 'Test123!',
            username: 'tristangoossens',
            birthDate: new Date('2002-04-02'),
            phonenumber: '061234567',
            role: UserRole.Admin,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await user.save()
    }
}
