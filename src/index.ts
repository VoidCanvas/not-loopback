import { Lb4BoilerplateApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { createConnection } from 'typeorm';

export { Lb4BoilerplateApplication };

import { User, AccessToken } from './models'

export async function setupEntities() {
  return createConnection({
    entities: [User, AccessToken],
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'postgre',
    database: 'lb4',
    synchronize: false,
    logging: true,
  });
}

export async function main(options: ApplicationConfig = {}) {
  const app = new Lb4BoilerplateApplication(options);
  await setupEntities();
  await app.boot();
  await app.start();


  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Explorer at ${url}/explorer`);

  return app;
}
