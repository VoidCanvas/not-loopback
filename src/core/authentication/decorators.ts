import { Capability } from './roles-enum';
import { authenticate } from '@loopback/authentication';
export interface RoleBasedAuth {
  capability: Capability
}

export function auth(spec?: RoleBasedAuth): MethodDecorator {
  const customAuthentication = authenticate('CustomStrategy', spec);
  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<{}>) => {
    customAuthentication(target, propertyKey, descriptor);
  }
}
