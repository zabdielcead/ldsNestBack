import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PerfilesDocument = Perfiles & Document;

@Schema()
export class Perfiles {
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



  @Prop({
        type:String,
        required:[
            true,
            'el idPerfil es obligatorio'
        ],
       
    })
    idPerfil: string;

    @Prop({
        type:String,
        required:[
            true,
            'el perfil es obligatorio'
        ]
    })
    perfil: string;

   

    @Prop({
        type:Boolean,
        default:true
    })
    activo: boolean;


   


  
}

export const PerfilesSchema = SchemaFactory.createForClass(Perfiles);