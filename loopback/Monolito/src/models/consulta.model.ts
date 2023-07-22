import {Model, model, property} from '@loopback/repository';

@model()
export class Consulta extends Model {
  @property({
    type: 'number',
    required: true,
  })
  a: number;

  @property({
    type: 'number',
    required: true,
  })
  b: number;


  constructor(data?: Partial<Consulta>) {
    super(data);
  }
}

export interface ConsultaRelations {
  // describe navigational properties here
}

export type ConsultaWithRelations = Consulta & ConsultaRelations;
