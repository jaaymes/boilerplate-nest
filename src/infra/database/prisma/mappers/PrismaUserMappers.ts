import { User } from '@/modules/user/entities/User';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMappers {
  static toPrisma({
    id,
    name,
    email,
    password,
    createdAt,
    avatar,
  }: User): PrismaUser {
    return {
      id,
      name,
      email,
      password,
      createdAt,
      avatar,
    };
  }

  static toDomain({
    id,
    name,
    email,
    password,
    createdAt,
    avatar,
  }: PrismaUser): User {
    return new User(
      {
        name,
        email,
        password,
        createdAt,
        avatar,
      },
      id,
    );
  }
}
