import {
  post,
  requestBody,
} from '@loopback/rest';
import { User, LoginRq, AccessToken } from '../models';
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
    @requestBody() reg: User
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
    @requestBody() login: LoginRq
  ): Promise<AccessToken> {
    return await accountService.login(login.username, login.password);
  }
}
