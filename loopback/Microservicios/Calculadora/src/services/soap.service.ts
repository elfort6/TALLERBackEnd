import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {SoapDataSource} from '../datasources';

export interface Soap {
  Add(args:executeAddParameter):Promise<executeAddResponse>
  Subtract(args:executeSubtractParameter):Promise<executeSubtractResponse>
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export class SoapProvider implements Provider<Soap> {
  constructor(
    // soap must match the name property in the datasource json file
    @inject('datasources.soap')
    protected dataSource: SoapDataSource = new SoapDataSource(),
  ) {}

  value(): Promise<Soap> {
    return getService(this.dataSource);
  }
}

export interface executeAddResponse{
  addResponse:{
    addResult:number
  }
}

export interface executeAddParameter{
  a:number,
  b:number
}

export interface executeSubtractResponse{
  SubtractResponse:{
    SubtractResult:number
  }
}

export interface executeSubtractParameter{
  a:number,
  b:number
}

