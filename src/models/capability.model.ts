import {
  Entity,
  Column,
} from '../core';
import { BaseEntity } from './';

@Entity({ name: 'capability' })
export class Capability extends BaseEntity<Capability> {
  constructor(data?: Partial<Capability>) {
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
