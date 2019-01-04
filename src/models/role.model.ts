import {
  Entity,
  Column,
} from '../core';
import { BaseEntity } from './';
import { ManyToMany, JoinTable } from 'typeorm';
import { Capability } from './capability.model';

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

  @Column()
  name: string;

  @Column()
  description?: string;

  @ManyToMany(type => Capability)
  @JoinTable({ name: 'role_capability_mapping' })
  capabilities: Capability[]

}
