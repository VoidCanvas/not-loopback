import { User } from '../models';
import { AuthenticationBindings } from '@loopback/authentication';
import { auth, api, get } from '../core';
import { inject } from '@loopback/context';

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
  @auth()
  async me(): Promise<User> {
    return this.user.toUiModel();
  }
}
