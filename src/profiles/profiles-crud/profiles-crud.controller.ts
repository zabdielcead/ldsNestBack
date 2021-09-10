import { Body, Controller, Get, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InterceptorHeaderInterceptor } from '../../common/exception/header.interceptor';
import { HttpExceptionFilter } from '../../common/exception/http.exception.filter';
import { MongoExceptionFilter } from '../../common/exception/mongo.exception.filter';
import { Perfiles } from '../../common/schema/perfil.schema';
import { ProfilesCrudService } from './profiles-crud.service';

@Controller('profiles')
export class ProfilesCrudController {

    constructor(private profileService:ProfilesCrudService ) {}

    @Get('findAll')
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findAllUsers(): Promise<Perfiles[]>{
        
        return await this.profileService.findAllUsuarios();
    }


    @Post('save')
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async save(@Body() perfil:Perfiles): Promise<Perfiles>{
       
        return await this.profileService.insertPerfil(perfil);
    }

    @Post('findProfile')
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async findUser(@Body() perfil:Perfiles): Promise<Perfiles>{
        
        return await this.profileService.findPerfil(perfil);
    }


    @Post('deleteProfile')
    @UseInterceptors(new InterceptorHeaderInterceptor())
    @UseFilters(new HttpExceptionFilter(), new MongoExceptionFilter())
    public async deleteProfile(@Body() perfil:Perfiles): Promise<Perfiles>{
        
        return await this.profileService.deletePerfil(perfil);
    }

}
