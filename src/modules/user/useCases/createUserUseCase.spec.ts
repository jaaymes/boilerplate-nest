import { compare } from '@/utils/crypto';
import { makeUser } from '../factories/userFactory';
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should create a user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const userMake = makeUser();

    const user = await createUserUseCase.execute(userMake);

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('should be able to create user with password encrypted', async () => {
    const password = 'password';

    const userMake = makeUser({ password });

    const user = await createUserUseCase.execute(userMake);

    await expect(compare(password, user.password)).resolves.toBeTruthy();
  });
});
