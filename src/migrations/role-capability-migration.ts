import { Role, Capability } from '../models';
import {
  Role as RoleEnum,
  Capability as CapabilityEnum,
} from '../core/authentication/roles-enum';
async function main() {
  const rolesStrings = Object.keys(RoleEnum).map(key => (RoleEnum as any)[key]) // tslint:disable-line
  const capabilityStrings = Object.keys(CapabilityEnum).map(key => (CapabilityEnum as any)[key]) // tslint:disable-line

  const dbRoles = await Role.find<Role>();
  const dbCapabilities = await Capability.find<Capability>();

  const newRoles: string[] = [];
  rolesStrings.forEach(roleStr => {
    if (!dbRoles.map(r => r.name).includes(roleStr)) {
      newRoles.push(roleStr);
    }
  });

  const newCapabilities: string[] = [];
  capabilityStrings.forEach(capabilityStr => {
    if (!dbCapabilities.map(r => r.name).includes(capabilityStr)) {
      newCapabilities.push(capabilityStr);
    }
  });

  await Promise.all(newCapabilities.map(cap => new Role({ name: cap, description: 'auto generated by role-capability-migration' }).save()));
  await Promise.all(newRoles.map(role => new Role({ name: role, description: 'auto generated by role-capability-migration' }).save()));

}

main();
