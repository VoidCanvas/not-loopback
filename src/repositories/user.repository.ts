import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { User } from '../models';
import { PostgresDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
const BCRYPT_SALT_ROUNDS = 10;
const salt = genSaltSync(BCRYPT_SALT_ROUNDS);

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(User, dataSource);
  }

  async register(username: string, password: string): Promise<User> {
    const user = new User({
      username,
      password: hashSync(password, salt)
    });
    return this.create(user);
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.findOne({
      where: {
        username,
      }
    });
    if (user) {
      return compareSync(password, user.password);
    }
    return false;
  }
}
