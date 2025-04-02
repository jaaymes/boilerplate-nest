import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';

type GetManyUserUseCaseProps = {
  page: number;
  limit: number;
};

@Injectable()
export class GetManyUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ page, limit }: GetManyUserUseCaseProps) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;

    const { items, total } = await this.userRepository.findAll({
      page: page ?? DEFAULT_PAGE,
      limit: limit ?? DEFAULT_LIMIT,
    });

    return {
      items,
      total,
      page,
      limit,
    };
  }
}
