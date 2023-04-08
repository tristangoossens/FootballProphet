import { ObjectId } from 'mongoose';
import { EntityBase } from './EntityBase';
import { UserRole } from './enum/UserRole';
import { Identity } from './Identity';
import { Pool } from './Pool';
import { Prediction } from './Prediction';
import { SuggestedPool } from './SuggestedPool';

export interface User extends EntityBase, Identity {
  birthDate: Date;
  phonenumber: string;
  avatarUrl: string;
  roles: UserRole[];
  predictions?: Prediction[];
  pools?: ObjectId[] | Pool[];
  suggestedPools?: SuggestedPool[];
}
