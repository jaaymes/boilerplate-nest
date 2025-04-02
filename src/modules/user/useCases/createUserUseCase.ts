import { hashPassword } from '@/utils/crypto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password, avatar }: CreateUserRequest) {
    const user = new User({
      name,
      email,
      password: hashPassword(password),
      avatar,
    });

    await this.userRepository.create(user);

    return user;
  }
}
