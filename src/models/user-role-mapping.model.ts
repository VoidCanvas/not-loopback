import {
  Entity,
  Column,
} from '../core';
import { BaseEntity } from './';
import { OneToOne, JoinColumn } from 'typeorm';
import { Role } from './role.model';
import { Capability } from './capability.model';
import { User } from './user.model';

@Entity({ name: 'user_role_mapping' })
export class UserRoleMappingMapping extends BaseEntity<UserRoleMappingMapping> {
  constructor(data?: Partial<UserRoleMappingMapping>) {
    super(data);
  }

  @Column('uuid', {
    nullable: false,
    default: 'uuid_generate_v4()',
    primary: true,
  })
  id: string;

  @Column({ name: 'role_id', nullable: false })
  roleId: string;
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @OneToOne(_type => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role

  @OneToOne(_type => Capability)
  @JoinColumn({ name: 'user_id' })
  user: User
}
