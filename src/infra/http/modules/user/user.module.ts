import { DatabaseModule } from '@/infra/database/database.module';
import { CreateUserUseCase } from '@/modules/user/useCases/createUserUseCase';
import { DeleteUserUseCase } from '@/modules/user/useCases/deleteUserUseCase';
import { GetByIdUserUseCase } from '@/modules/user/useCases/getByIdUserUseCase';
import { GetManyUserUseCase } from '@/modules/user/useCases/getManyUseCase';
import { UpdateUserUseCase } from '@/modules/user/useCases/updateUserUseCase';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    GetManyUserUseCase,
    UpdateUserUseCase,
    GetByIdUserUseCase,
  ],
})
export class UserModule {}
