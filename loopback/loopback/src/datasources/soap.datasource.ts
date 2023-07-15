import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'soap',
  connector: 'soap',
  url: 'https://ecs.syr.edu/faculty/fawcett/Handouts/cse775/code/calcWebService/Calc.asmx',
  wsdl: 'https://ecs.syr.edu/faculty/fawcett/Handouts/cse775/code/calcWebService/Calc.asmx?wsdl',
  remotingEnabled: true,
  operations: {
    Add: {
      service: 'Calculator_x0020_Web_x0020_Service',
      port: 'Calculator_x0020_Web_x0020_ServiceSoap',
      operation: 'Add'
    },
    Subtract: {
      service: 'Calculator_x0020_Web_x0020_Service',
      port: 'Calculator_x0020_Web_x0020_ServiceSoap',
      operation: 'Subtract'
    }
  }
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SoapDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'soap';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.soap', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
