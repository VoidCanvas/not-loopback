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
  options: any; // tslint:disable-line
  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }
    const name = this.metadata.strategy;
    if (name === 'CustomStrategy') {
      this.options = this.metadata.options;
      return new BearerStrategy(this.verify.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  async verify(
    token: string,
    cb: (err: Error | null, user?: User | false) => void,
  ) {
    let _user = null;
    const accessToken = await AccessToken.findOne<AccessToken>({
      where: {
        token
      }
    });
    if (accessToken) {
      const user = await User.findOne<User>({
        where: { id: accessToken.userId },
        relations: ['details', 'roles']
      });
      if (user) {
        user.accessToken = accessToken;
        const capabilityStrings = await user.getCapabilities();
        if (this.options) {
          if (capabilityStrings.includes(this.options.capability)) {
            _user = user;
          }
        } else {
          _user = user;
        }
      }
    }
    cb(null, _user || false); // when auth token not found
  }
}
