import {
  repository,
} from '@loopback/repository';
import {
  post,
  requestBody,
  api,
} from '@loopback/rest';
import { User, RegisterRq, LoginRq, AccessToken } from '../models';
import { UserRepository } from '../repositories';

@api({
  basePath: '/api/account',
  paths: {}
})
export class AccountController {

  constructor(
    @repository(UserRepository)
    public accountRepository: UserRepository,
  ) { }

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
    return await this.accountRepository.register(reg.username, reg.password);
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
    return await this.accountRepository.login(login.username, login.password);
  }
}
