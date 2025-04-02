import { User } from '@/modules/user/entities/User';
import {
  UserRepository,
  UsersResult,
} from '@/modules/user/repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import { PrismaUserMappers } from '../mappers/PrismaUserMappers';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMappers.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async update(user: User): Promise<void> {
    const userRaw = PrismaUserMappers.toPrisma(user);

    await this.prisma.user.update({
      where: { id: user.id },
      data: userRaw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMappers.toDomain(user);
  }

  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<UsersResult> {
    const skip = (page - 1) * limit;
    const take = Number(limit);
    const users = await this.prisma.user.findMany({
      skip,
      take,
    });

    const total = await this.prisma.user.count();

    return {
      items: users.map((item) => PrismaUserMappers.toDomain(item)),
      total,
      page,
      limit,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMappers.toDomain(user);
  }
}
