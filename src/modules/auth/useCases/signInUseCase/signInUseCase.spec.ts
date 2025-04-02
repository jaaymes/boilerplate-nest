import { makeUser } from '@/modules/user/factories/userFactory';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../models/UserPayload';
import { SignInUseCase } from './signInUseCase';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;
describe('SignInUseCase', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('should be able to create valid JWT token', async () => {
    const user = makeUser({});
    const jwt = await signInUseCase.execute({ user });

    const payload = jwtService.decode(jwt) as UserPayload;

    expect(payload.sub).toBe(user.id);
  });
});
