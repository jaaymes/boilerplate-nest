import { CreateUserUseCase } from '@/modules/user/useCases/createUserUseCase';
import { DeleteUserUseCase } from '@/modules/user/useCases/deleteUserUseCase';
import { GetByIdUserUseCase } from '@/modules/user/useCases/getByIdUserUseCase';
import { GetManyUserUseCase } from '@/modules/user/useCases/getManyUseCase';
import { UpdateUserUseCase } from '@/modules/user/useCases/updateUserUseCase';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserBody } from './dtos/createUserBody';
import { UpdateUserBody } from './dtos/updateuserBody';
import { UserViewModel } from './viewModel/userViewModel';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getManyUserUseCase: GetManyUserUseCase,
    private readonly getByIdUserUseCase: GetByIdUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password, avatar } = body;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
      avatar,
    });

    return UserViewModel.toHTTP(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
  }

  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const users = await this.getManyUserUseCase.execute({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    const usersViewModel = users.items.map((item) =>
      UserViewModel.toHTTP(item),
    );

    return {
      items: usersViewModel,
      total: users.total,
      page: users.page,
      limit: users.limit,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.getByIdUserUseCase.execute(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserViewModel.toHTTP(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    const updatedFields: {
      name?: string;
      email?: string;
      avatar?: string | null;
    } = {};

    if (body.name !== undefined) {
      updatedFields.name = body.name;
    }

    if (body.email !== undefined) {
      updatedFields.email = body.email;
    }

    if (body.avatar !== undefined) {
      updatedFields.avatar = body.avatar;
    }

    const user = await this.updateUserUseCase.execute(id, updatedFields);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserViewModel.toHTTP(user);
  }
}
