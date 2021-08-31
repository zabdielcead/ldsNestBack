import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Perfiles } from './perfil.schema';
import { Type, Transform } from 'class-transformer';


export type UsuariosDocument = Usuarios & Document ;

@Schema({ versionKey: false })
export class Usuarios {
//   @Prop({
//       index:'text',
//       type:String,
//       required:[
//           true,
//           'el _id es obligatorio'
//       ],
//       unique:true
//   })
// @Transform(({ value }) => value.toString())
  @Prop()    
  _id: string;

    



  @Prop({
        type:String,
        required:[
            true,
            'el idUsuario es obligatorio'
        ],
       
    })
    idUsuario: string;

    @Prop({
        type:String,
        required:[
            true,
            'el perfil es obligatorio'
        ]
    })
    nombre: string;

    @Prop({
        type:String,
        required:[
            true,
            'el cargo es obligatorio'
        ]
    })
    cargo: string;

    @Prop({
        type:String,
        required:[
            true,
            'el cargo es obligatorio'
        ]
    })
    email: string;

    @Prop({
        type:String,
        required:[
            true,
            'el tel Celular es obligatorio'
        ]
    })
    telCel: string;

    @Prop({
        type:String,
        required:[
            true,
            'el tel Casa es obligatorio'
        ]
    })
    telCasa: string;


    @Prop({
       // type: mongoose.Schema.Types.ObjectId, ref: 'Perfiles',
        type: String,
        required:[
            true,
            'el idPerfil es obligatorio'
        ]
    })
    idPerfil: string;

   

    @Prop({
        type:Boolean,
        default:true
    })
    activo: boolean;


    @Prop({
        type:String,
        required:[
            true,
            'el pass es obligatorio'
        ]
    })
    pass: string;


   


  
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios);