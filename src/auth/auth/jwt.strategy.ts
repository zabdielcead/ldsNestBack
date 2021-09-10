import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { DataException } from '../../common/exception/data.exception';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authlds'),
      ignoreExpiration: false,
      secretOrKey: 'ldsBAT',
    });
  }

  async validate(payload: any) {
      console.log('idUsuario', payload.idUsuario);
      console.log('email',     payload.email);
      if(!payload.idUsuario && !payload.email){
        throw new DataException('Error en el token');
      }
    return { idUsuario: payload.idUsuario, email: payload.email };
  }
}