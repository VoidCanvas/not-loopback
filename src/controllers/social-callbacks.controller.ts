import {
  HttpErrors
} from '@loopback/rest';
import { User, AccessToken } from '../models';
import { api, post, facebookAuth } from '../core';
import { inject } from '@loopback/core';
import { AuthenticationBindings } from '@loopback/authentication';

@api()
export class SocialLoginController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER) private user: User,
  ) { }


  @post({
    path: '/facebook',
    description: 'To login an existing user',
    returnType: AccessToken
  })
  @facebookAuth()
  async facebookLogin(
  ): Promise<AccessToken> {
    const accessToken = this.user.accessToken;
    if (!accessToken) {
      throw new HttpErrors.Unauthorized('Some error happened while authenticating');
    }
    return accessToken;
  }
}
