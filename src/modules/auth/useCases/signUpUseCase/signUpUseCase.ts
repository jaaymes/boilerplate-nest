import { User } from '@/modules/user/entities/User';
import { UserRepository } from '@/modules/user/repositories/UserRepository';
import { hashPassword } from '@/utils/crypto';
import { Injectable } from '@nestjs/common';
import { UserAlreadyException } from '../../exceptions/UserAlreadyException';

type SignUpUseCaseRequest = {
  email: string;
  password: string;
  name: string;
  avatar?: string;
};

@Injectable()
export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: SignUpUseCaseRequest) {
    const { email, password, name, avatar } = data;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new UserAlreadyException();
    }

    const hashedPassword = hashPassword(password);

    const userCreated = new User({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await this.userRepository.create(userCreated);
    return userCreated;
  }
}
