import {
  requestBody,
  HttpErrors
} from '@loopback/rest';
import { User, LoginRq, AccessToken, RegisterRq } from '../models';
import { accountService } from '../services/account.service';
import { api, post } from '../core';

@api()
export class AccountController {
  @post({
    path: '/register',
    description: 'To register a new user',
    returnType: User
  })
  async register(
    @requestBody({ required: true }) reg: RegisterRq
  ): Promise<User> {
    return await accountService.register(reg.username, reg.password);
  }

  @post({
    path: '/login',
    description: 'To login an existing user',
    returnType: AccessToken
  })
  async login(
    @requestBody({ required: true }) login: LoginRq
  ): Promise<AccessToken> {
    const accessToken = await accountService.login(login.username, login.password);
    if (!accessToken.token) {
      throw new HttpErrors.Unauthorized('username password did not match');
    }
    return accessToken;
  }
}
