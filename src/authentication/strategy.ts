import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { AccessTokenRepository, UserRepository } from '../repositories';
import { repository } from '@loopback/repository';

export class CustomAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(AccessTokenRepository)
    private accessTokenRepository: AccessTokenRepository,
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }
    const name = this.metadata.strategy;
    if (name === 'CustomStrategy') {
      return new BearerStrategy(this.verify.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  async verify(
    token: string,
    cb: (err: Error | null, user?: UserProfile | false) => void,
  ) {
    const accessToken = await this.accessTokenRepository.findOne({
      where: {
        token
      }
    });
    if (accessToken) {
      const user = await this.userRepository.findById(accessToken.userId);
      cb(null, (user || false));
    }
    cb(null, false) // when auth token found
  }
}
