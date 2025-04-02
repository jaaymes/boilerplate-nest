import { UserRepositoryInMemory } from '../repositories/UserRepositoryInMemory';
import { DeleteUserUseCase } from './deleteUserUseCase';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
  });

  it('should be able to delete a user', async () => {
    await deleteUserUseCase.execute('1');

    expect(userRepositoryInMemory.users).toHaveLength(0);
  });
});
