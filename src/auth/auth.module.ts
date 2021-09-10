import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuariosSchema } from '../common/schema/usuario.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';


@Module({
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [
    AuthController
  ],
  imports: [
    MongooseModule.forFeature([
                                 
                                  { 
                                    name: Usuarios.name, 
                                    schema: UsuariosSchema,
                      
                                  },
                
                                ]),
    PassportModule,
    JwtModule.register({
      secret: 'ldsBAT',
      signOptions: { expiresIn: '24h' },
    }),
  ]
})
export class AuthModule {}
