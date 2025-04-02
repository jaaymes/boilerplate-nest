import { AppException } from '@/exceptions/appException';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Usuário não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
