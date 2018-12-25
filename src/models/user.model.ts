import {
  Entity,
  Column,
} from '../core';
import { BaseEntity } from './';

@Entity('users', { schema: 'public' })
export class User extends BaseEntity<User> {

  constructor(data?: Partial<User>) {
    super(data);
  }

  @Column('uuid', {
    nullable: false,
    default: 'uuid_generate_v4()',
    primary: true,
  })
  id: string;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;
}
