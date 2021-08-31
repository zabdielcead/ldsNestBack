import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios, UsuariosDocument } from 'src/common/schema/usuario.schema';
import { UserDto } from '../dtos/user.dto';
import { DataException } from '../../common/exception/data.exception';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Usuarios.name) private usuarioModel: Model<UsuariosDocument>
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

}
