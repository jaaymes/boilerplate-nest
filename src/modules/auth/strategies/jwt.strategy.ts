import { generateMd5Hash } from '@/utils/md5';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../models/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_SECRET || generateMd5Hash('paozinho_de_queijo'),
      ignoreExpiration: false,
    });
  }

  async validate({ sub, ...payload }: UserPayload) {
    return { id: sub, ...payload };
  }
}
