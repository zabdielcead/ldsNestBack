import { Body, Controller, Get, Param, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InterceptorHeaderInterceptor } from 'src/common/exception/header.interceptor';
import { HttpExceptionFilter } from 'src/common/exception/http.exception.filter';
import { MongoExceptionFilter } from 'src/common/exception/mongo.exception.filter';
import { Tareas } from '../../common/schema/tareas.schema';
import { TareasCrudService } from './tareas-crud.service';

@Controller('tareas')
export class TareasCrudController {


    constructor(private tareasService: TareasCrudService) {}



    
    @Get('findAll')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findAllUsers(): Promise<Tareas[]>{
        
        return await this.tareasService.findTareas();
    }

    @Get('findActives')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findTareas(): Promise<Tareas[]>{
        
        return await this.tareasService.findTareasActivas();
    }


    @Get('findTareasOrg/:idPerfil')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findUser(@Param('idPerfil' ) idPerfil:string): Promise<Tareas[]>{
        
        return await this.tareasService.findTareasOrganizacion(idPerfil.toUpperCase());
    }


    @Post('save')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async saveUpdateTarea(@Body() tarea:Tareas): Promise<Tareas>{
       // console.log('tarea', tarea);
       // return 'guardado';
        return await this.tareasService.insertTarea(tarea);
    }


    @Post('findTarea')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findTarea(@Body() tarea:Tareas): Promise<Tareas>{
        // console.log('tarea', tarea);
       // return 'guardado';
        return await this.tareasService.findTarea(tarea);
    }

    @Post('deleteTarea')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async deleteTarea(@Body() tarea:Tareas): Promise<Tareas>{
        
        return await this.tareasService.deleteTarea(tarea);
    }




}
