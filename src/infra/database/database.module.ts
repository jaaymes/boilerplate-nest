import { UserRepository } from '@/modules/user/repositories/UserRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/repositories/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
