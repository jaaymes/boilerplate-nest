import { IncorrectValuesException } from '@/exceptions/IncorrectValuesException';
import { mapperClassValidationErrorToAppException } from '@/utils/mappers';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { SignUpBody } from '../dtos/SignUpBody';

type SignUpBodySchema = {
  email: string;
  password: string;
  name: string;
  avatar?: string;
};

@Injectable()
export class SignUpDTOValidadeMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    const body = req.body as unknown as SignUpBodySchema;

    const signUpBody = new SignUpBody();
    signUpBody.email = body.email;
    signUpBody.password = body.password;
    signUpBody.name = body.name;
    signUpBody.avatar = body.avatar;

    const validations = await validate(signUpBody);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
