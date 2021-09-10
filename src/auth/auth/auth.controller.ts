import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dtos/user.dto';
import { HttpExceptionFilter } from '../../common/exception/http.exception.filter';
import { DataException } from 'src/common/exception/data.exception';
import { Usuarios } from '../../common/schema/usuario.schema';
import { UserLoginDto } from '../dtos/userlogin.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @UseFilters(new HttpExceptionFilter())
     login(@Body() user: UserDto ):Promise<UserLoginDto>{
        return  this.authService.loginUser(user);
        
       
        
        // if(userFind){
        //     return this.authService.findUser(user);
        // }else{
        //     throw new DataException('No se encuentra el usuario');
        // }
       //return userFind;
        // userFind.then((message) => { 
        //     console.log('ok',message);
        //     if(message){
        //         return message
        //     }else{
        //         throw new DataException('No se encuentra el usuario');
        //     }
        // }).catch((message) => { 
        //     throw new DataException('No se encuentra el usuario');
            
        // });

        

        // const userFind = this.authService.findUser(user);
        // console.log('user',userFind);
        // if(userFind){
        //     return this.authService.findUser(user);
        // }else{
        //     throw new DataException('No se encuentra el usuario');
        // }
   }
}
