import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { UserRepository } from '../repositories/UserRepository';
@Injectable()
export class GetByIdUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
