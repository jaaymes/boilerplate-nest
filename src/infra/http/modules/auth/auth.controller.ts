import { LocalAuthGuard } from '@/infra/http/modules/auth/guards/localAuth.guard';
import { SignInUseCase } from '@/modules/auth/useCases/signInUseCase/signInUseCase';
import { SignUpUseCase } from '@/modules/auth/useCases/signUpUseCase/signUpUseCase';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public } from './decorators/isPublic';
import { AuthRequestModel } from './models/authRequestModel';
import { AuthRequestSignUpModel } from './models/authRequestSignUpModel';
@Controller()
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
  ) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req: AuthRequestModel) {
    const access_token = await this.signInUseCase.execute({
      user: req.user,
    });

    return { access_token };
  }

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  @Public()
  async signUp(@Body() body: AuthRequestSignUpModel) {
    const { email, password, name } = body;

    const user = await this.signUpUseCase.execute({ email, password, name });

    return user;
  }
}
