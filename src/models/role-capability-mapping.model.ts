import {
  Entity,
  Column,
} from '../core';
import { BaseEntity } from './';
import { OneToOne, JoinColumn } from 'typeorm';
import { Role } from './role.model';
import { Capability } from './capability.model';

@Entity({ name: 'role_capability_mapping' })
export class RoleCapabilityMapping extends BaseEntity<RoleCapabilityMapping> {
  constructor(data?: Partial<RoleCapabilityMapping>) {
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
  @Column({ name: 'capability_id', nullable: false })
  capabilityId: string;

  @OneToOne(_type => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role

  @OneToOne(_type => Capability)
  @JoinColumn({ name: 'capability_id' })
  capability: Capability
}
