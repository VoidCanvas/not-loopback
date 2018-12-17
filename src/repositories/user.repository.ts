import { DefaultCrudRepository, juggler, repository, Filter, AnyObject } from '@loopback/repository';
import { User, LoginRs, AccessToken } from '../models';
import { PostgresDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import uuid = require('uuid');
import { AccessTokenRepository } from './access-token.repository';
const BCRYPT_SALT_ROUNDS = 10;
const salt = genSaltSync(BCRYPT_SALT_ROUNDS);

function refineUserObject(user: User) {
  if (user) {
    delete user.password;
  }
  return user;
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository(AccessTokenRepository)
    private accessTokenRepository: AccessTokenRepository,
  ) {
    super(User, dataSource);
  }

  // Register a new user
  async register(username: string, password: string): Promise<User> {
    const user = new User({
      username,
      password: hashSync(password, salt)
    });
    return this.create(user);
  }

  // login to get the access token
  async login(username: string, password: string): Promise<AccessToken> {
    const accessToken = new AccessToken();
    const user = await this.findOne({
      where: {
        username,
      }
    });
    if (user && compareSync(password, user.password)) {
      accessToken.token = uuid.v4();
      accessToken.userId = user.id;
      await this.accessTokenRepository.create(accessToken);
    }
    return accessToken;
  }


  // modifying the current methods to hide password
  async findOne(filter?: Filter<User> | undefined, options?: AnyObject | undefined): Promise<User | null> {
    const user = await super.findOne(filter, options);
    return user && refineUserObject(user);
  }
  async findById(id: string, filter?: Filter<User> | undefined, options?: AnyObject | undefined): Promise<User> {
    const user = await super.findById(id, filter, options);
    return refineUserObject(user);
  }
  async find(filter?: Filter<User> | undefined, options?: AnyObject | undefined): Promise<User[]> {
    const users = await super.find(filter, options);
    return users.map(refineUserObject);
  }
}
