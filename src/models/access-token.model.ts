import { Entity, Column } from '../core';
import { BaseEntity } from './';

@Entity('access_token')
export class AccessToken extends BaseEntity<AccessToken> {
  @Column({ primary: true }) id: string;
  @Column() token: string;
  @Column({ name: 'user_id' }) userId: string;
  @Column() ttl: number;
  @Column() type: string;

  constructor(data?: Partial<AccessToken>) {
    super(data);
  }
}
