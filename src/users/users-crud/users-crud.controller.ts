import { Controller, Post, Get, UseFilters, UseInterceptors, Body, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '../../common/exception/http.exception.filter';
import { Perfiles, PerfilesDocument } from '../../common/schema/perfil.schema';
import { UsersCrudService } from './users-crud.service';
import { Usuarios } from '../../common/schema/usuario.schema';
import { Tareas } from '../../common/schema/tareas.schema';
import { InterceptorHeaderInterceptor } from '../../common/exception/header.interceptor';
import { User } from '../interfaces/user.interface';
import { MongoExceptionFilter } from '../../common/exception/mongo.exception.filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersCrudController {
    constructor(private usersCrudService: UsersCrudService) {}




    @Post('save')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async save(@Body() user:Usuarios): Promise<Usuarios>{
        console.log('user', user);
        return await this.usersCrudService.insertUser(user);
    }


    @Get('findAll')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findAllUsers(): Promise<Usuarios[]>{
        
        return await this.usersCrudService.findAllUsuarios();
    }

    @Post('findUser')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findUser(@Body() user:Usuarios): Promise<Usuarios>{
        
        return await this.usersCrudService.findUsuario(user);
    }

    @Post('deleteUser')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async deleteUser(@Body() user:Usuarios): Promise<Usuarios>{
        
        return await this.usersCrudService.deleteUserLogic(user);
    }


    
   @Get('find')
   @UseGuards(AuthGuard('jwt'))
   @UseFilters(new HttpExceptionFilter())
   getAllUsers() {
    return this.usersCrudService.findAll();
  }


  @Get("findED")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new InterceptorHeaderInterceptor())
  @UseFilters(new HttpExceptionFilter())
    public async loginDos(): Promise<Perfiles[]>{
        return await this.usersCrudService.findPerfiles();
    }

    // @Get("findUser")
    // public async users(): Promise<Usuarios[]>{
    //     return await this.usersCrudService.findUsuario();
    // }

    @Get("findTareas")
    public async tareas(): Promise<Tareas[]>{
        return await this.usersCrudService.findTareas();
    }

    @Get("findTareasfilter")
    public async tareasfilter(): Promise<Tareas[]>{
        return await this.usersCrudService.findComplete();
    }

}
