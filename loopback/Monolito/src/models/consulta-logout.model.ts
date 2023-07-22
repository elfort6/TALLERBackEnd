import {Model, model, property} from '@loopback/repository';

@model()
export class ConsultaLogout extends Model {
  @property({
    type: 'string',
    required: true,
  })
  refreshToke: string;


  constructor(data?: Partial<ConsultaLogout>) {
    super(data);
  }
}

export interface ConsultaLogoutRelations {
  // describe navigational properties here
}

export type ConsultaLogoutWithRelations = ConsultaLogout & ConsultaLogoutRelations;
