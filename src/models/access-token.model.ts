import { Entity, Column } from '../core';
import { BaseEntity } from './';
import { AccessTokenType } from '../core/authentication/roles-enum';

@Entity('access_token')
export class AccessToken extends BaseEntity<AccessToken> {
  @Column({ primary: true }) id: string;
  @Column() token: string;
  @Column({ name: 'refresh_token' }) refreshToken?: string;
  @Column({ name: 'access_token_type' }) accessTokenType?: AccessTokenType;
  @Column({ name: 'user_id' }) userId: string;
  @Column() ttl: number;
  @Column() type: string;

  constructor(data?: Partial<AccessToken>) {
    super(data);
  }
}
