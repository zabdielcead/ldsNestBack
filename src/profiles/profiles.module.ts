import { Module } from '@nestjs/common';
import { ProfilesCrudService } from './profiles-crud/profiles-crud.service';
import { ProfilesCrudController } from './profiles-crud/profiles-crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Perfiles, PerfilesSchema } from '../common/schema/perfil.schema';
import { Usuarios, UsuariosSchema } from '../common/schema/usuario.schema';
import { Tareas, TareasSchema } from '../common/schema/tareas.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [
      ProfilesCrudService
    ],
  controllers: [
      ProfilesCrudController
    ],
    imports:[
        MongooseModule.forFeature([
            { 
              name: Perfiles.name, 
              schema: PerfilesSchema,

            },
            { 
              name: Usuarios.name, 
              schema: UsuariosSchema,

            },
            { 
              name: Tareas.name, 
              schema: TareasSchema,

            },
          ]),
          AuthModule
    ],
    
})
export class ProfilesModule {


}
