import { AppException } from '@/exceptions/appException';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyException extends AppException {
  constructor() {
    super({
      message: 'Usuário já existe',
      status: HttpStatus.CONFLICT,
    });
  }
}
