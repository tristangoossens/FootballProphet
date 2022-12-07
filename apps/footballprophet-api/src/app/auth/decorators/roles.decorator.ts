import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@footballprophet/domain';

export const HasRoles = (roles: UserRole[]) => SetMetadata('roles', roles);