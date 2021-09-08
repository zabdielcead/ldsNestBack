import { Module } from '@nestjs/common';
import { TareasCrudService } from './tareas-crud/tareas-crud.service';
import { TareasCrudController } from './tareas-crud/tareas-crud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Perfiles, PerfilesSchema } from '../common/schema/perfil.schema';
import { Usuarios, UsuariosSchema } from '../common/schema/usuario.schema';
import { Tareas, TareasSchema } from '../common/schema/tareas.schema';

@Module({
  providers: [TareasCrudService],
  controllers: [TareasCrudController],
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
export class TareasModule {}
