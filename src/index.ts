import { Lb4BoilerplateApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { connectDataSource } from './core/repository';
export { Lb4BoilerplateApplication };


export async function main(options: ApplicationConfig = {}) {
  const app = new Lb4BoilerplateApplication(options);
  await connectDataSource();
  await app.boot();
  await app.start();


  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Explorer at ${url}/explorer`);

  return app;
}
