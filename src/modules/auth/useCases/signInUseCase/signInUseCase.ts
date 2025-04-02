import { User } from '@/modules/user/entities/User';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../models/UserPayload';

interface SignInUseCaseRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInUseCaseRequest) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
      avatar: user.avatar,
    };

    const jwt = this.jwtService.sign(payload);

    return jwt;
  }
}
