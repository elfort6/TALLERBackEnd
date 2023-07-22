// Uncomment these imports to begin using these cool features!

import { inject, service } from "@loopback/core";
import { KeyCloakService } from "../services";
import { Request, RestBindings, getModelSchemaRef, post, requestBody, response } from "@loopback/rest";
import { ConsultaLogin, ConsultaLogout } from "../models";
import { promises } from "fs";

// import {inject} from '@loopback/core';


export class UserController {
  constructor(
    @service(KeyCloakService)
    public keyCloackService:KeyCloakService,
    @inject(RestBindings.Http.REQUEST)
    private request:Request
  ) {}

  @post('/user/login')
  @response(200,{
    description:'',
    content:{'application/json':{schema:getModelSchemaRef(ConsultaLogin)}}
  })
  async login(
    @requestBody({
      description:'',
      content:{'application/json':{schema:getModelSchemaRef(ConsultaLogin)}}
    })
    consulta:ConsultaLogin
  ):Promise<any>{
    return this.keyCloackService.login(consulta.usuario,consulta.clave);
  }

  @post('/user/logout')
  @response(200,{
    description:'',
    content:{'application/json':{schema:getModelSchemaRef(ConsultaLogout)}}
  })
  async logout(
    @requestBody({
      description:'',
      content:{'application/json':{schema:getModelSchemaRef(ConsultaLogout)}}
    })
    consulta:ConsultaLogout
  ):Promise<any>{
    return this.keyCloackService.logout(consulta.refreshToke);
  }
}
