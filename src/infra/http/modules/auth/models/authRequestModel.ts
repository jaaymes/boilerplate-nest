import { User } from '@/modules/user/entities/User';

import { Request } from 'express';

export class AuthRequestModel extends Request {
  user: User;
}
