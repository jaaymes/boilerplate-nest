import { IncorrectValuesException } from '@/exceptions/IncorrectValuesException';
import { mapperClassValidationErrorToAppException } from '@/utils/mappers';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { SignInBody } from '../dtos/SignInBody';

type SignInBodySchema = {
  email: string;
  password: string;
};

@Injectable()
export class SignInDTOValidadeMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    const body = req.body as unknown as SignInBodySchema;

    const signInBody = new SignInBody();
    signInBody.email = body.email;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
