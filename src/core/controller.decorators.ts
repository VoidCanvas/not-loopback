import {
  api as _api,
  PathObject,
  get as _get,
  post as _post,
  put as _put,
  del as _del
} from '@loopback/rest';
import * as config from '../config.json';

class CoreControllerApiSpec {
  basePath: string;
  paths?: PathObject
}

class CoreRouterSpec {
  path: string;
  description: string;
  returnType: Function
}

function createLb4OpenApiSpec(spec: CoreRouterSpec) {
  return {
    responses: {
      '200': {
        description: spec.description,
        content: {
          'application/json': {
            schema: { 'x-ts-type': spec.returnType }
          }
        },
      },
    },
  }
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


export function get(spec: CoreRouterSpec): MethodDecorator {
  const __get = _get(spec.path, createLb4OpenApiSpec(spec));
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<{}>) => {
    __get(target, propertyKey, descriptor);
  }
}
export function post(spec: CoreRouterSpec): MethodDecorator {
  const __post = _post(spec.path, createLb4OpenApiSpec(spec));
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<{}>) => {
    __post(target, propertyKey, descriptor);
  }
}
export function put(spec: CoreRouterSpec): MethodDecorator {
  const __put = _put(spec.path, createLb4OpenApiSpec(spec));
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<{}>) => {
    __put(target, propertyKey, descriptor);
  }
}
export function del(spec: CoreRouterSpec): MethodDecorator {
  const __del = _del(spec.path, createLb4OpenApiSpec(spec));
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<{}>) => {
    __del(target, propertyKey, descriptor);
  }
}
