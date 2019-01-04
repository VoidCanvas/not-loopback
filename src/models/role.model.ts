import {
  Entity,
  Column,
} from '../core';
import { BaseEntity } from './';

@Entity({ name: 'role' })
export class Role extends BaseEntity<Role> {
  constructor(data?: Partial<Role>) {
    super(data);
  }

  @Column('uuid', {
    nullable: false,
    default: 'uuid_generate_v4()',
    primary: true,
  })
  id: string;

  name: string;

  description?: string;

}
