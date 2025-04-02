import { UserRepository } from '@/modules/user/repositories/UserRepository';
import { compare } from '@/utils/crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

interface ValidateUserUseCaseRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ email, password }: ValidateUserUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
