import { User, UserRole } from '@footballprophet/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly users: User[] = [
        {
            id: '1',
            email: 'tristan@mail.nl',
            password: 'Test123!',
            username: 'tristangoossens',
            birthDate: new Date('2002-04-02'),
            phonenumber: '061234567',
            city: 'Amsterdam',
            address: 'PC Hooftstraat 1',
            roles: [UserRole.Admin],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            email: 'janpieter@mail.nl',
            password: 'Test123!',
            username: 'janpieter21',
            birthDate: new Date('1973-11-21'),
            phonenumber: '061234567',
            city: 'Rotterdam',
            address: 'Kruisplein 1',
            roles: [UserRole.User],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }
}
