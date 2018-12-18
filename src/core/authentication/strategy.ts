import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { AccessToken, User } from '../../models';

export class CustomAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
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
    cb: (err: Error | null, user?: User | false) => void,
  ) {
    const accessToken = await AccessToken.findOne<AccessToken>({
      where: {
        token
      }
    });
    if (accessToken) {
      const user = await User.findById<User>(accessToken.userId);
      cb(null, (user || false));
    }
    cb(null, false) // when auth token found
  }
}
