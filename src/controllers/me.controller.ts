import { User } from '../models';
import { AuthenticationBindings } from '@loopback/authentication';
import { auth, api, get } from '../core';
import { inject } from '@loopback/context';
import { Capability } from '../core/authentication/roles-enum';

@api()
export class MeController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: User,
  ) { }

  @get({
    path: '/',
    description: 'To get the current user',
    returnType: User
  })
  @auth({
    capability: Capability.GET_OWN_INFO
  })
  async me(): Promise<User> {
    return this.user;
  }
}
