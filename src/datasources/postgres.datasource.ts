import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as config from './postgres.datasource.json';

export class PostgresDataSource extends juggler.DataSource {
  static dataSourceName = 'postgres';

  constructor(
    @inject('datasources.config.postgres', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

}
