import { User } from '../entities/User';
import { UserRepository, UsersResult } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((user) => user.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<UsersResult> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = this.users.slice(startIndex, endIndex);

    return {
      items,
      total: this.users.length,
      page,
      limit,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
