import { User } from '@/modules/user/entities/User';

export class UserViewModel {
  static toHTTP({ id, name, email, createdAt, avatar }: User) {
    return {
      id,
      name,
      email,
      createdAt,
      avatar,
    };
  }

  static toHTTPList(users: User[]) {
    return users.map((user) => UserViewModel.toHTTP(user));
  }
}
