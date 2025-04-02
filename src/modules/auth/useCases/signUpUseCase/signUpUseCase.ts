import { User } from '@/modules/user/entities/User';
import { UserRepository } from '@/modules/user/repositories/UserRepository';
import { hashPassword } from '@/utils/crypto';
import { Injectable } from '@nestjs/common';
import { UserAlreadyException } from '../../exceptions/UserAlreadyException';

@Injectable()
export class SignUpUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: { email: string; password: string; name: string }) {
    const { email, password, name } = data;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new UserAlreadyException();
    }

    const hashedPassword = hashPassword(password);

    const userCreated = new User({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.create(userCreated);
    return userCreated;
  }
}
