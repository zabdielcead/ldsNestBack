import { Injectable } from '@nestjs/common';
import { PerfilesDocument, Perfiles } from '../../common/schema/perfil.schema';
import { Usuarios, UsuariosDocument } from '../../common/schema/usuario.schema';
import { Tareas, TareasDocument } from '../../common/schema/tareas.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DataException } from 'src/common/exception/data.exception';


@Injectable()
export class TareasCrudService {

    constructor(@InjectModel(Perfiles.name) private perfilModel: Model<PerfilesDocument>,
                @InjectModel(Usuarios.name) private usuarioModel: Model<UsuariosDocument>,
                @InjectModel(Tareas.name) private tareasModel: Model<TareasDocument>
    ){}

    async findTareasActivas():Promise<Tareas[]>{
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


     async findTareas():Promise<Tareas[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.tareasModel.aggregate([
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



     async insertTarea(tarea:Tareas): Promise<Tareas>{
      
        if(tarea.idTarea === 0){

            console.log('idtarea');
            const secuencia = await this.getNextSequenceValue();
            console.log('secuencia', secuencia);
            tarea._id = ''+secuencia;
            tarea.idTarea = secuencia;
        }

        return await this.tareasModel.findOneAndUpdate({ idTarea: tarea.idTarea }, tarea, {
            new: true,
            upsert: true,
            runValidators: true,
            useFindAndModify:false,

          });
     }

    
     async getNextSequenceValue():Promise<number>{

        
         
        const secuencia =  await this.tareasModel.findOneAndUpdate({ _id: 'idTarea' }, {
            new: true,
            upsert: true,
            runValidators: true,
            useFindAndModify:false,
            $inc:{
                'idTarea':1
            }
          });
            
          console.log('secuencia',secuencia.idTarea );
          return secuencia.idTarea;

     }


     async findTarea(tarea:Tareas): Promise<Tareas>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
       
            
            const tareaFind:Tareas =  await this.tareasModel.findOne({"idTarea": tarea.idTarea}).exec()
                                            .catch(err =>{
                                              throw new DataException('No se encuentra el usuario')
                                            });  
  
            if(tareaFind){
                return tareaFind;
            }else{
              throw new DataException('No se encuentra el usuario')
            }
      
     }

     async deleteTarea(tarea:Tareas): Promise<Tareas>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
        
         tarea.activo = false;
            
         return await  this.tareasModel.findOneAndUpdate({ idTarea: tarea.idTarea }, tarea, {
            new: true,
            upsert: true,
            runValidators: true,
            useFindAndModify:false
           
          });
                                            
  
            
      
     }

     async findTareasOrganizacion(organizacion:string):Promise<Tareas[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.tareasModel.aggregate([
             {
                 $match: {activo:true, idPerfil: organizacion}
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
