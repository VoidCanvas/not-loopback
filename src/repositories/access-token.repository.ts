import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { AccessToken } from '../models';
import { PostgresDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class AccessTokenRepository extends DefaultCrudRepository<
  AccessToken,
  typeof AccessToken.prototype.id
  > {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(AccessToken, dataSource);
  }
}
