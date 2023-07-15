import { Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { InjectModel } from '@nestjs/mongoose';
import { tareas, tareasDocument } from './schemas/tareas.schema';
import { Model } from 'mongoose';

@Injectable()
export class TareasService {
  constructor(
    @InjectModel(tareas.name,'taller') private tareasModel : Model <tareasDocument>
  ){}
  create(createTareaDto: CreateTareaDto) {
    const createdTarea = new this.tareasModel(createTareaDto);
    return createdTarea.save();
  }

  findAll() {
    return this.tareasModel.find();
  }

  findOne(id: string) {
    return this.tareasModel.findById(id);
  }

  update(id: string, updateTareaDto: UpdateTareaDto) {
    return this.tareasModel.findByIdAndUpdate(id,updateTareaDto);
  }

  remove(id: string) {
    return this.tareasModel.findByIdAndDelete(id);
  }
}
