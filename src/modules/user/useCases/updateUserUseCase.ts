import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string | null;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    { name, email, avatar }: UpdateUserRequest,
  ): Promise<User | null> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      return null;
    }

    const updatedUser = new User(
      {
        name: name !== undefined ? name : userExists.name,
        email: email !== undefined ? email : userExists.email,
        password: userExists.password,
        avatar: avatar !== undefined ? avatar : userExists.avatar,
        createdAt: userExists.createdAt,
      },
      userExists.id,
    );

    await this.userRepository.update(updatedUser);

    return updatedUser;
  }
}
