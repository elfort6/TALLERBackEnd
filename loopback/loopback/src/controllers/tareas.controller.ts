import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tareas} from '../models';
import {TareasRepository} from '../repositories';

export class TareasController {
  constructor(
    @repository(TareasRepository)
    public tareasRepository : TareasRepository,
  ) {}

  @post('/tareas')
  @response(200, {
    description: 'Tareas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tareas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tareas, {
            title: 'NewTareas',
            exclude: ['id'],
          }),
        },
      },
    })
    tareas: Omit<Tareas, 'id'>,
  ): Promise<Tareas> {
    return this.tareasRepository.create(tareas);
  }

  @get('/tareas/count')
  @response(200, {
    description: 'Tareas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tareas) where?: Where<Tareas>,
  ): Promise<Count> {
    return this.tareasRepository.count(where);
  }

  @get('/tareas')
  @response(200, {
    description: 'Array of Tareas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tareas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tareas) filter?: Filter<Tareas>,
  ): Promise<Tareas[]> {
    return this.tareasRepository.find(filter);
  }

  @patch('/tareas')
  @response(200, {
    description: 'Tareas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tareas, {partial: true}),
        },
      },
    })
    tareas: Tareas,
    @param.where(Tareas) where?: Where<Tareas>,
  ): Promise<Count> {
    return this.tareasRepository.updateAll(tareas, where);
  }

  @get('/tareas/{id}')
  @response(200, {
    description: 'Tareas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tareas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tareas, {exclude: 'where'}) filter?: FilterExcludingWhere<Tareas>
  ): Promise<Tareas> {
    return this.tareasRepository.findById(id, filter);
  }

  @patch('/tareas/{id}')
  @response(204, {
    description: 'Tareas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tareas, {partial: true}),
        },
      },
    })
    tareas: Tareas,
  ): Promise<void> {
    tareas.modifiedAt = new Date();
    await this.tareasRepository.updateById(id, tareas);
  }

  @put('/tareas/{id}')
  @response(204, {
    description: 'Tareas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tareas: Tareas,
  ): Promise<void> {
    await this.tareasRepository.replaceById(id, tareas);
  }

  @del('/tareas/{id}')
  @response(204, {
    description: 'Tareas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tareasRepository.deleteById(id);
  }
}
