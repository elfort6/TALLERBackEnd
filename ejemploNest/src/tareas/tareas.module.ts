import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { tareas, tareasSchema } from './schemas/tareas.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: tareas.name,
        schema:tareasSchema
      }
    ],'taller')
  ],
  controllers: [TareasController],
  providers: [TareasService]
})
export class TareasModule {}
