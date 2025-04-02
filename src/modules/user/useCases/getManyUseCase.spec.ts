import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';
import { GetManyUserUseCase } from './getManyUseCase';

describe('Get Many User Use Case', () => {
  let getManyUserUseCase: GetManyUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    getManyUserUseCase = new GetManyUserUseCase(userRepositoryInMemory);
  });

  it('should be able to get many users', async () => {
    const users = await getManyUserUseCase.execute({
      page: 1,
      limit: 10,
    });

    expect(users).toEqual([]);
  });
});
