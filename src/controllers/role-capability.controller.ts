import { Role, Capability as CapabilityModel, CreateCapabilityOrRoleRq, RoleCapabilityMapping, SuccessRs, UserRoleMapping } from '../models';
import { auth, api, post, get } from '../core';
import { Capability } from '../core/authentication/roles-enum';
import { requestBody } from '@loopback/rest';

@api()
export class RoleCapabilityController {
  constructor(
  ) { }

  @post({
    path: '/createCapability',
    description: 'To create a capability',
    returnType: CapabilityModel
  })
  @auth({
    capability: Capability.ROLE_CAPABILITY_CRUD
  })
  async createCapability(
    @requestBody({ required: true }) capability: CreateCapabilityOrRoleRq
  ): Promise<CapabilityModel> {
    const _cap = new CapabilityModel(capability);
    await _cap.save();
    return _cap;
  }


  @post({
    path: '/createRole',
    description: 'To create a role',
    returnType: Role
  })
  @auth({
    capability: Capability.ROLE_CAPABILITY_CRUD
  })
  async createRole(
    @requestBody({ required: true }) role: CreateCapabilityOrRoleRq
  ): Promise<Role> {
    const _cap = new Role(role);
    await _cap.save();
    return _cap;
  }


  @post({
    path: '/createRoleCapabilityMapping',
    description: 'To create a role & capability mapping',
    returnType: SuccessRs
  })
  @auth({
    capability: Capability.ROLE_CAPABILITY_CRUD
  })
  async createRoleCapabilityMapping(
    @requestBody({ required: true }) mapping: {
      roleId: string,
      capabilityIds: string[]
    }
  ): Promise<SuccessRs> {
    await Promise.all(mapping.capabilityIds.map(capId => {
      const map = new RoleCapabilityMapping({
        capabilityId: capId,
        roleId: mapping.roleId
      });
      return map.save();
    }));

    return { success: true };
  }



  @post({
    path: '/createUserRoleMapping',
    description: 'To create a use & role mapping',
    returnType: SuccessRs
  })
  @auth({
    capability: Capability.ROLE_CAPABILITY_CRUD
  })
  async createUserRoleMapping(
    @requestBody({ required: true }) mapping: {
      roleId: string,
      userIds: string[]
    }
  ): Promise<SuccessRs> {
    await Promise.all(mapping.userIds.map(userId => {
      const map = new UserRoleMapping({
        userId: userId,
        roleId: mapping.roleId
      });
      return map.save();
    }));

    return { success: true };
  }
}
