import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override = {}) => {
  return new User(
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123123',
      avatar: 'https://example.com/avatar.png',
      ...override,
    },
    id,
  );
};
