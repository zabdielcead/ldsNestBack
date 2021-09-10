import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios, UsuariosDocument } from 'src/common/schema/usuario.schema';
import { UserDto } from '../dtos/user.dto';
import { DataException } from '../../common/exception/data.exception';
import { JwtService } from '@nestjs/jwt';
import { create } from 'domain';
import { UserLoginDto } from '../dtos/userlogin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Usuarios.name) private usuarioModel: Model<UsuariosDocument>,
        private jwtService: JwtService
    ){}


    async findUser(user: UserDto):Promise<Usuarios>{
            
          const usuarioConsulta:Usuarios =  await this.usuarioModel.findOne({$or: [ { "idUsuario": user.idUsuario}, {"email":user.email} ] }).exec()
                                          .catch(err =>{
                                            throw new DataException('No se encuentra el usuario')
                                          });  

          if(usuarioConsulta){
            if(usuarioConsulta.activo){
              return usuarioConsulta;
            }else{
              throw new DataException('El usuario no se encuentra activo')
            }
          }else{
            throw new DataException('No se encuentra el usuario')
          }
    }


    async loginUser(user: UserDto):Promise<UserLoginDto>{
            
        let usuarioConsulta:Usuarios =  await this.findUser(user);
  
        if(user && user.pass === usuarioConsulta.pass && usuarioConsulta.activo){
            // let userJwt: any = {...usuarioConsulta};
            // let   jwt = await this.createjwt(user);
            // console.log('jwt', jwt);
            // userJwt.jwts = jwt;
          
            return  new UserLoginDto(usuarioConsulta.email, await this.createjwt(user), usuarioConsulta.idUsuario);
          

         
  
        }
      
       throw new DataException('No se encuentra el usuario');
      
    }

    async createjwt(user: UserDto){
      const payloads= { idUsuario: user.idUsuario, email: user.email  };

      return this.jwtService.sign(payloads);
    }

}
