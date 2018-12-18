import {
  repository,
} from '@loopback/repository';
import {
  post,
  requestBody,
  api,
} from '@loopback/rest';
import { User, RegisterRq, LoginRq, AccessToken } from '../models';
import { accountService } from '../services/account.service';

@api({
  basePath: '/api/account',
  paths: {}
})
export class AccountController {

  @post('/register', {
    responses: {
      '200': {
        description: 'To register a new user.',
        content: { 'application/json': { schema: { 'x-ts-type': RegisterRq } } },
      },
    },
  })
  async register(
    @requestBody() reg: RegisterRq
  ): Promise<User> {
    return await accountService.register(reg.username, reg.password);
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'To login an existing user',
        content: { 'application/json': { schema: { 'x-ts-type': LoginRq } } },
      },
    },
  })
  async login(
    @requestBody() login: LoginRq
  ): Promise<AccessToken> {
    return await accountService.login(login.username, login.password);
  }
}
