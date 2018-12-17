import { BaseModel } from '..';
import { model, property } from '@loopback/repository';

@model()
export class LoginRs extends BaseModel {
  @property() accessToken: string;
  constructor(data?: Partial<LoginRs>) {
    super(data);
  }
}
