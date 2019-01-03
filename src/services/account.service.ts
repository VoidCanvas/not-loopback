import { User, AccessToken, UserDetails } from '../models';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import uuid = require('uuid');
const BCRYPT_SALT_ROUNDS = 10;
const salt = genSaltSync(BCRYPT_SALT_ROUNDS);

export class AccountService {
  // Register a new user
  async register(username: string, password: string): Promise<User> {
    const user = new User({
      username,
      password: hashSync(password, salt),
    });
    await user.save();
    const details = new UserDetails({ userId: user.id });
    await details.save();
    user.details = details;
    return user;
  }

  // login to get the access token
  async login(username: string, password: string): Promise<AccessToken> {
    const accessToken = new AccessToken();
    const user = await User.findOne<User>({
      where: {
        username,
      }
    });
    if (user && compareSync(password, user.password)) {
      accessToken.token = uuid.v4();
      accessToken.userId = user.id;
      await accessToken.save();
    }

    return accessToken;
  }
}

export const accountService = new AccountService();
