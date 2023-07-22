import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Tareas, TareasRelations} from '../models';

export class TareasRepository extends DefaultCrudRepository<
  Tareas,
  typeof Tareas.prototype.id,
  TareasRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Tareas, dataSource);
  }
}
