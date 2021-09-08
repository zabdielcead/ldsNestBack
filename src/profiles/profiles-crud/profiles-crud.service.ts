import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PerfilesDocument, Perfiles } from '../../common/schema/perfil.schema';
import { Usuarios, UsuariosDocument } from '../../common/schema/usuario.schema';
import { Tareas, TareasDocument } from '../../common/schema/tareas.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DataException } from '../../common/exception/data.exception';
@Injectable()
export class ProfilesCrudService {


    constructor(@InjectModel(Perfiles.name) private perfilModel: Model<PerfilesDocument>,
                @InjectModel(Usuarios.name) private usuarioModel: Model<UsuariosDocument>,
                @InjectModel(Tareas.name) private tareasModel: Model<TareasDocument>
    ){}
    async findAllUsuarios(): Promise<Perfiles[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.perfilModel.find().exec();
     }


     async insertPerfil(perfil:Perfiles): Promise<Perfiles>{
        
       
        //return await new this.usuarioModel(user).save();
        
        return await this.perfilModel.findOneAndUpdate({ idPerfil: perfil.idPerfil }, perfil, {
            new: true,
            upsert: true,
            runValidators: true,
            useFindAndModify:false
          });


      
    }



    async findPerfil(perfil:Perfiles): Promise<Perfiles>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
       
            
            const perfilFind:Perfiles =  await this.perfilModel.findOne({"idPerfil": perfil.idPerfil}).exec()
                                            .catch(err =>{
                                              throw new DataException('No se encuentra el usuario')
                                            });  
  
            if(perfilFind){
                return perfilFind;
            }else{
              throw new DataException('No se encuentra el usuario')
            }
      
     }

     async deletePerfil(perfil:Perfiles): Promise<Perfiles>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
        
         perfil.activo = false;
            
         return await  this.perfilModel.findOneAndUpdate({ idPerfil: perfil.idPerfil }, perfil, {
            new: true,
            upsert: true,
            runValidators: true,
            useFindAndModify:false
           
          });
                                            
  
            
      
     }
}
