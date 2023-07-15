import {Model, model, property} from '@loopback/repository';

@model()
export class ConsultaLogin extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<ConsultaLogin>) {
    super(data);
  }
}

export interface ConsultaLoginRelations {
  // describe navigational properties here
}

export type ConsultaLoginWithRelations = ConsultaLogin & ConsultaLoginRelations;
