import { Controller, Post, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http.exception.filter';
import { Perfiles, PerfilesDocument } from 'src/common/schema/perfil.schema';
import { UsersCrudService } from './users-crud.service';
import { Usuarios } from '../../common/schema/usuario.schema';
import { Tareas } from '../../common/schema/tareas.schema';

@Controller('users')
export class UsersCrudController {
    constructor(private usersCrudService: UsersCrudService) {}
    
   @Get('find')
   @UseFilters(new HttpExceptionFilter())
   getAllUsers() {
    return this.usersCrudService.findAll();
  }


  @Get("findED")
    public async loginDos(): Promise<Perfiles[]>{
        return await this.usersCrudService.findPerfiles();
    }

    @Get("findUser")
    public async users(): Promise<Usuarios[]>{
        return await this.usersCrudService.findUsuario();
    }

    @Get("findTareas")
    public async tareas(): Promise<Tareas[]>{
        return await this.usersCrudService.findTareas();
    }

}
