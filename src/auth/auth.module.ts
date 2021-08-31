import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuariosSchema } from '../common/schema/usuario.schema';


@Module({
  providers: [
    AuthService
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
  ]
})
export class AuthModule {}
