import { createConnection, ConnectionOptions } from 'typeorm';
import { getModelMap } from '../model.decorators';

export const connectDataSource = async () => {
  const dataSourcesWiseEntityRepresentation: {
    [key: string]: Function[]
  } = {};
  const dataSourcesRepresentation: {
    [key: string]: Object
  } = {};
  const ModelMap = getModelMap();
  ModelMap.forEach((config, Model) => {
    const entities = dataSourcesWiseEntityRepresentation[config.datasourceConfig.name] || [];
    entities.push(Model);
    dataSourcesWiseEntityRepresentation[config.datasourceConfig.name] = entities;
    dataSourcesRepresentation[config.datasourceConfig.name] = config.datasourceConfig;
  })
  Object.keys(dataSourcesWiseEntityRepresentation).forEach(async (key) => {
    const entities = dataSourcesWiseEntityRepresentation[key];
    const config = dataSourcesRepresentation[key];
    await createConnection({
      entities,
      type: 'postgres',
      synchronize: false,
      logging: true,
      ...config,
    });
  });
  return true;
}
