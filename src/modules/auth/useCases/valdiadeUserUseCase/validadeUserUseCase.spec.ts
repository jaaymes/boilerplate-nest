import { makeUser } from '@/modules/user/factories/userFactory';
import { UserRepositoryInMemory } from '@/modules/user/repositories/UserRepositoryInMemory';
import { hashPassword } from '@/utils/crypto';
import { UnauthorizedException } from '@nestjs/common';
import { ValidateUserUseCase } from './validadeUserUseCase';
describe('Validate User Use Case', () => {
  let validateUserUseCase: ValidateUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to return user when credentials are valid', async () => {
    const password = '123123';
    const user = makeUser({ password: hashPassword(password) });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password,
    });

    expect(result).toEqual(user);
  });

  it('should not be able to return user when credentials are invalid', async () => {
    const password = '123123';
    const user = makeUser({ password: hashPassword(password) });

    userRepositoryInMemory.users = [user];

    await expect(
      validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: password,
      }),
    ).rejects.toThrow(UnauthorizedException);

    await expect(
      validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
