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

     async findPerfiles(): Promise<Perfiles[]>{
       // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
       //const existeEmail =  await this.perfilModel.find().exec();
        ///console.log('perfil', existeEmail);
        return this.perfilModel.find().exec();;
    }

    async findUsuario(): Promise<Usuarios[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.usuarioModel.find().exec();;
     }

     async findTareas(): Promise<Tareas[]>{
        // const existeEmail =  await this.perfilModel.findOne({idPerfil:'ED'});
        //const existeEmail =  await this.perfilModel.find().exec();
         ///console.log('perfil', existeEmail);
         return this.tareasModel.find().exec();;
     }

}
