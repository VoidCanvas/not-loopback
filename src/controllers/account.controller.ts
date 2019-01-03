import {
  post,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import { User, LoginRq, AccessToken, RegisterRq } from '../models';
import { accountService } from '../services/account.service';
import { api } from '../core';

@api()
export class AccountController {
  @post('/register', {
    responses: {
      '200': {
        description: 'To register a new user.',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async register(
    @requestBody({ required: true }) reg: RegisterRq
  ): Promise<User> {
    return await accountService.register(reg.username, reg.password);
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'To login an existing user',
        content: { 'application/json': { schema: { 'x-ts-type': AccessToken } } },
      },
    },
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
