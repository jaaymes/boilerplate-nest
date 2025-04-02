import { User } from '../entities/User';

export type UsersResult = {
  items: User[];
  total: number;
  page: number;
  limit: number;
};

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }): Promise<UsersResult>;
  abstract findByEmail(email: string): Promise<User | null>;
}
