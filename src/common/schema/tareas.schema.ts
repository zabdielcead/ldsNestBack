import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Perfiles } from './perfil.schema';
import { Usuarios } from './usuario.schema';

export type TareasDocument = Tareas & Document;

@Schema({ versionKey: false })
export class Tareas {
//   @Prop({
//       index:'text',
//       type:String,
//       required:[
//           true,
//           'el _id es obligatorio'
//       ],
//       unique:true
//   })
//   _id: string;

 
  @Prop(
  )    
  _id: string;


  @Prop({
        type:Number,
        required:[
            true,
            'el idTarea es obligatorio'
        ],
       
    })
    idTarea: number;

    @Prop({
       // type: mongoose.Schema.Types.ObjectId, ref: 'Perfiles',
       type:String,
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
            'la fecha es obligatorio'
        ]
    })
    fecha: string;

    @Prop({
        type:String,
        required:[
            true,
            'La descripcion de la Tarea es obligatorio'
        ]
    })
    descTarea: string;

    @Prop({
        type:String,
        required:[
            true,
            'La  fecha Caducidad es obligatorio'
        ]
    })
    fechaCaducidad: string;

    @Prop({
        type:String,
        //type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios',
        required:[
            true,
            'el idUsuario es obligatorio'
        ]
    })
    idUsuario: string;


   

   

    


    @Prop({
        type:String,
        required:[
            true,
            'La descripcion final es obligatorio'
        ]
    })
    descFinal: string;


   


  
}

export const TareasSchema = SchemaFactory.createForClass(Tareas);