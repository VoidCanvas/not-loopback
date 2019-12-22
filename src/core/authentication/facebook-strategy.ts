import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import { Strategy as FacebookStrategy, StrategyOption, Profile } from 'passport-facebook';
import { AccessToken, User } from '../../models';
import { accountService } from '../../services';
import { AccessTokenType } from './roles-enum';

const strategyOptions: StrategyOption = {
  clientID: "string",
  clientSecret: "string",
  callbackURL: "string",
}

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
    if (name === 'FacebookStrategy') {
      this.options = this.metadata.options;
      return new FacebookStrategy(strategyOptions, this.verify.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  async verify(
    token: string,
    refreshToken: string,
    profile: Profile,
    cb: (err: Error | null, user?: User | false) => void,
  ) {
    const email = profile.emails && profile.emails[0]

    let user = null;
    let accessToken = await AccessToken.findOne<AccessToken>({
      where: {
        token
      }
    });

    if (!accessToken) {
      user = await User.findOne<User>({
        where: {
          username: email
        },
        relations: ['details', 'roles']
      });
      if (!user && email) {
        user = await accountService.register(email.toString(), "DUMMY")
        user.details.firstName = profile.displayName;
        user.details.avatarURL = (profile.photos && profile.photos[0].toString())
        await user.details.save();
      }
      if (user) {
        accessToken = new AccessToken({
          token,
          refreshToken,
          userId: user.id,
          accessTokenType: AccessTokenType.FACEBOOK
        });
        await accessToken.save();
        user.accessToken = accessToken;
      }

    }



    cb(null, user || false); // when auth token not found
  }
}
