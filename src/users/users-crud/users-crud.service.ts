import { Injectable } from '@nestjs/common';
import { Observable, Observer } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { ForbiddenException } from '../../common/exception/forbidden.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PerfilesDocument, Perfiles } from '../../common/schema/perfil.schema';
import { from } from 'rxjs';
import { Usuarios, UsuariosDocument } from '../../common/schema/usuario.schema';
import { Tareas, TareasDocument } from '../../common/schema/tareas.schema';
import * as bcrypt from 'bcrypt';
import { DataException } from '../../common/exception/data.exception';
@Injectable()
export class UsersCrudService {
    private readonly users: User[];


     

    // private observersss:Observer<any> = {
    //     next: value  => console.log('siguiente [next]:', value),
    //     error: error => console.warn('error [obs]:', error),
    //     complete: () => console.info('completado')
    // };


    constructor(@InjectModel(Perfiles.name) private perfilModel: Model<PerfilesDocument>,
                @InjectModel(Usuarios.name) private usuarioModel: Model<UsuariosDocument>,
                @InjectModel(Tareas.name) private tareasModel: Model<TareasDocument>
    ){}

    private  obs$ = new Observable<User[]>(subs => {
        let user = [ {
            '_id'            :'11',
            'idUsuario'      :'22',
            'nombre'         :'CARLOS',
            'cargo'          :'DEVELOPERss',
            'email'          :'email',
            'telCel'         :'5555555',
            'telCasa'        :'666',
            'idPerfil'       :'7',
            'activo'         :true,
            'pass'           :'123'

        }];
        //subs.next(user);
        subs.error(new ForbiddenException('errorresservice'))
    
        subs.complete(); 
       
    });

    findAll(): Observable<User[]>{
        return this.obs$;
    }

    async insertUser(user:Usuarios): Promise<Usuarios>{
        
       
        //return await new this.usuarioModel(user).save();


       
        
        return await this.usuarioModel.findOneAndUpdate({ _id: user._id }, user, {
            new: true,
            upsert: true,
            runValidators: true,
            useFindAndModify:false
          });


      
    }


    async findAllUsuarios(): Promise<Usuarios[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.usuarioModel.find().exec();;
     }


    async findUsuario(user:Usuarios): Promise<Usuarios>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
       
            
            const usuarioConsulta:Usuarios =  await this.usuarioModel.findOne({$or: [ { "idUsuario": user.idUsuario}, {"email":user.email} ] }).exec()
                                            .catch(err =>{
                                              throw new DataException('No se encuentra el usuario')
                                            });  
  
            if(usuarioConsulta){
                return usuarioConsulta;
            }else{
              throw new DataException('No se encuentra el usuario')
            }
      
     }


     async deleteUserLogic(user:Usuarios): Promise<Usuarios>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
        
         user.activo = false;
            
         return await  this.usuarioModel.findOneAndUpdate({ idUsuario: user.idUsuario }, user, {
            new: true,
            upsert: true,
            runValidators: true,
            useFindAndModify:false
           
          });
                                            
  
            
      
     }






     async findPerfiles(): Promise<Perfiles[]>{
       // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
       //const existeEmail =  await this.perfilModel.find().exec();
        ///console.log('perfil', existeEmail);
        return this.perfilModel.find().exec();;
    }

    

     async findTareas(): Promise<Tareas[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.tareasModel.find().exec();;
     }

     async findComplete(): Promise<Tareas[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.tareasModel.aggregate([
             {
                 $match: {activo:true}
             },
             {
                $lookup: 
                {
                    from: 'perfiles',
                    localField: 'idPerfil',
                    foreignField: 'idPerfil',
                    as: 'perfilRel'
                },
                
             },
             {
                $lookup: 
                {
                    from: 'usuarios',
                    localField: 'idUsuario',
                    foreignField: 'idUsuario',
                    as: 'userRel'
                }
             }    
         ]).sort({"fechaCaducidad":1})
     }

}
