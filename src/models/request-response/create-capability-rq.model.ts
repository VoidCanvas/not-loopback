import { model, property } from '../../core';

@model()
export class CreateCapabilityOrRoleRq {
  @property() name: string;
  @property() description: string;
}
