import {
  api,
  get
} from '@loopback/rest';
import { User } from '../models';
import { AuthenticationBindings } from '@loopback/authentication';
import { auth } from '../core/auth.decorators';
import { inject } from '@loopback/context';

@api({
  basePath: '/api/me',
  paths: {}
})
export class MeController {

  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: User,
  ) { }

  @get('/', {
    responses: {
      '200': {
        description: 'To get the current user',
      },
    },
  })
  @auth()
  async me(): Promise<User> {
    return this.user;
  }
}
