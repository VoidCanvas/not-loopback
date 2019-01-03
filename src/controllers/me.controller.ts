import {
  get
} from '@loopback/rest';
import { User } from '../models';
import { AuthenticationBindings } from '@loopback/authentication';
import { auth, api } from '../core';
import { inject } from '@loopback/context';

@api()
export class MeController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: User,
  ) { }

  @get('/', {
    responses: {
      '200': {
        description: 'To get the current user',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  @auth()
  async me(): Promise<User> {
    return this.user;
  }
}
