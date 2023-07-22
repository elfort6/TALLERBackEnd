import {inject} from '@loopback/core';
import { Soap, executeAddResponse, executeSubtractResponse } from '../services';
import { getModelSchemaRef, post, requestBody, response } from '@loopback/rest';
import { Consulta } from '../models';
import { authenticate } from '@loopback/authentication';

@authenticate('keyCloak','keyCloakAdmin')
export class CalculadoraController {
  constructor(
    @inject('services.Soap')
    protected soap:Soap,
  ) {}
  
  @post('/suma')
  @response(200,{
    description:'funcion de suma',
    content:{'application/json':{schema: getModelSchemaRef(Consulta)}}
  })
  async add(
    @requestBody({
      description:'funcion de suma',
      content:{'application/json':{schema: getModelSchemaRef(Consulta)}} 
    })
    consulta:Consulta
  ):Promise<executeAddResponse>{
    return this.soap.Add({a:consulta.a,b:consulta.b})
  }

  @authenticate('keyCloakAdmin')
  @post('/resta')
  @response(200,{
    description:'funcion de resta',
    content:{'application/json':{schema: getModelSchemaRef(Consulta)}}
  })
  async subtract(
    @requestBody({
      description:'funcion de resta',
      content:{'application/json':{schema: getModelSchemaRef(Consulta)}} 
    })
    consulta:Consulta
  ):Promise<executeSubtractResponse>{
    return this.soap.Subtract({a:consulta.a,b:consulta.b})
  }



}
