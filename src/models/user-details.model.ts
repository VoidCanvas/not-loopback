import {
  Entity,
  Column,
  property,
} from '../core';
import { BaseEntity } from './';
import { User } from './user.model';
import { OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'user_details' })
export class UserDetails extends BaseEntity<UserDetails> {
  constructor(data?: Partial<UserDetails>) {
    super(data);
  }

  @Column('uuid', {
    nullable: false,
    default: 'uuid_generate_v4()',
    primary: true,
  })
  id: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({
    nullable: true,
    name: 'first_name'
  })
  firstName?: string;

  @Column({
    nullable: true,
    name: 'last_name'
  })
  lastName?: string;

  @Column({
    nullable: true,
    name: 'avatar_url'
  })
  avatarURL?: string;

  @Column({ nullable: true })
  status?: string;

  @property()
  @OneToOne(_type => User)
  @JoinColumn({ name: 'user_id' })
  user: User
}
