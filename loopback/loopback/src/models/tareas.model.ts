import {Entity, model, property} from '@loopback/repository';

@model()
export class Tareas extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    default: "no iniciada",
  })
  estado?: string;

  @property({
    type: 'string',
    default: "baja",
  })
  prioridad?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  cerateAt?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  modifiedAt?: Date;


  constructor(data?: Partial<Tareas>) {
    super(data);
  }
}

export interface TareasRelations {
  // describe navigational properties here
}

export type TareasWithRelations = Tareas & TareasRelations;
