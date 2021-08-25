import { Module } from '@nestjs/common';
import { UsersCrudService } from './users-crud/users-crud.service';
import { UsersCrudController } from './users-crud/users-crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Perfiles, PerfilesSchema } from '../common/schema/perfil.schema';
import { Usuarios, UsuariosSchema } from '../common/schema/usuario.schema';
import { Tareas, TareasSchema } from '../common/schema/tareas.schema';

@Module({
  providers: [
              UsersCrudService
            ],
  controllers: [
                UsersCrudController
            ],
  imports: [
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
          ],
})
export class UsersModule {}
