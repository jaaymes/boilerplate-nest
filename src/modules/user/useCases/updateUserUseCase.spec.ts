import { makeUser } from '../factories/userFactory';
import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';
import { UpdateUserUseCase } from './updateUserUseCase';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to update a user', async () => {
    const user = makeUser({
      id: '1',
    });

    userRepositoryInMemory.users = [user];

    const userUpdated = await updateUserUseCase.execute(user.id, user);

    expect(userRepositoryInMemory.users).toEqual([userUpdated]);
  });
});
