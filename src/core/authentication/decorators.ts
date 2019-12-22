import { Capability } from './roles-enum';
import { authenticate } from '@loopback/authentication';
export interface RoleBasedAuth {
  capability: Capability
}

export function auth(spec?: RoleBasedAuth): MethodDecorator {
  const customAuthentication = authenticate('CustomStrategy', spec);
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    customAuthentication(target, propertyKey, descriptor);
  }
}

export function facebookAuth(spec?: RoleBasedAuth): MethodDecorator {
  const customAuthentication = authenticate('FacebookStrategy', spec);
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    customAuthentication(target, propertyKey, descriptor);
  }
}
