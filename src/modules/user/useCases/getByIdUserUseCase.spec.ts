import { makeUser } from '../factories/userFactory';
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';
import { GetByIdUserUseCase } from './getByIdUserUseCase';

describe('GetByIdUserUseCase', () => {
  let getByIdUserUseCase: GetByIdUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    getByIdUserUseCase = new GetByIdUserUseCase(userRepositoryInMemory);
  });

  it('should be able to get a user by id', async () => {
    const user = makeUser({
      id: '1',
    });

    userRepositoryInMemory.users = [user];

    const userFound = await getByIdUserUseCase.execute('1');

    expect(userFound).toEqual(user);
  });
});
