import {
  Entity,
  Column,
  property
} from '../core';
import { BaseEntity, Capability } from './';
import { OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserDetails } from './user-details.model';
import { Role } from './role.model';
import { UserRoleMapping } from './user-role-mapping.model';
import { RoleCapabilityMapping } from './role-capability-mapping.model';
import * as _ from 'lodash';
import { AccessToken } from './access-token.model';

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

  @property()
  @OneToOne(type => UserDetails, details => details.user)
  details: UserDetails;

  // Fore reference, not for saving
  accessToken?: AccessToken

  @ManyToMany(type => Role)
  @JoinTable({
    name: 'user_role_mapping',
    joinColumn: {
      name: 'user_id'
    },
    inverseJoinColumn: { name: 'role_id' }
  })
  roles: Role[]

  private _capabilities: Capability[];

  async getCapabilities(): Promise<string[]> {
    if (!this.roles) {
      const roleMappings = await UserRoleMapping.find<UserRoleMapping>({
        where: {
          userId: this.id
        },
        relations: ['role']
      });
      this.roles = roleMappings.map(mapping => mapping.role);
    }

    if (!this._capabilities) {
      const capabilityMappings = await Promise.all(this.roles.map(role => {
        return RoleCapabilityMapping.find<RoleCapabilityMapping>({
          where: { roleId: role.id },
          relations: ['capability']
        })
      }));
      const capabilityMapping = _.flatten<RoleCapabilityMapping>(capabilityMappings)
      this._capabilities = capabilityMapping.map(mapping => mapping.capability);
    }
    return this._capabilities.map(cap => cap.name);
  }

  toUiModel(): User {
    const user = new User(this);
    delete user.password;
    delete user._capabilities;
    delete user.roles;
    return user;
  }
}
