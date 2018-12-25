import {
  api as _api,
  PathObject,
} from '@loopback/rest';
import * as config from '../config.json';

class CoreControllerApiSpec {
  basePath: string;
  paths?: PathObject
}

export function api(spec: CoreControllerApiSpec = new CoreControllerApiSpec()): Function {
  return (target: Function) => {
    if (!spec.basePath) {
      const conventionalBasePath = target.name.replace(new RegExp('Controller$'), '');
      spec.basePath = `/${conventionalBasePath.toLowerCase()}`
    }
    const basePath = `${config.apiBasePath}${spec.basePath}`;
    const lb_api = _api({
      basePath,
      paths: spec.paths || {}
    });
    return lb_api(target);
  }
}
