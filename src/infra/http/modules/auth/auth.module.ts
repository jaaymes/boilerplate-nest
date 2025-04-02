import { DatabaseModule } from '@/infra/database/database.module';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { SignInUseCase } from '@/modules/auth/useCases/signInUseCase/signInUseCase';
import { SignUpUseCase } from '@/modules/auth/useCases/signUpUseCase/signUpUseCase';
import { ValidateUserUseCase } from '@/modules/auth/useCases/valdiadeUserUseCase/validadeUserUseCase';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { SignInDTOValidadeMiddleware } from './middleware/signInDTOValidate.middleware';
import { SignUpDTOValidadeMiddleware } from './middleware/signUpDTOValidate.middleware';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    ValidateUserUseCase,
    SignInUseCase,
    JwtStrategy,
    SignUpUseCase,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidadeMiddleware).forRoutes('/signIn');
    consumer.apply(SignUpDTOValidadeMiddleware).forRoutes('/signUp');
  }
}
