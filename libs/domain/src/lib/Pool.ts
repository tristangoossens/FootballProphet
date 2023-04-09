import mongoose, { ObjectId } from 'mongoose';
import { League } from './League';
import { User } from './User';
import { EntityBase } from './EntityBase';

export interface Pool extends EntityBase {
  league: mongoose.Types.ObjectId | League;
  name: string;
  description: string;
  logoUrl: string;
  isPrivate: boolean;
  members: mongoose.Types.ObjectId[] | User[];

  // Pool owner
  owner: mongoose.Types.ObjectId | User;
  joinCode?: string;
}
