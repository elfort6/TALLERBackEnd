import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type tareasDocument = HydratedDocument<tareas>;

@Schema()
export class tareas {
    
        @Prop()
        nombre:String;
        
        @Prop()
        descripcion:String;
        
        @Prop()
        status:String;

        @Prop()
        prioridad:String;      
}

export const tareasSchema = SchemaFactory.createForClass(tareas);