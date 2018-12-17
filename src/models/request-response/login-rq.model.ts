import { BaseModel } from '..';
import { model, property } from '@loopback/repository';

@model()
export class LoginRq extends BaseModel {
  @property() username: string;
  @property() password: string;
  constructor(data?: Partial<LoginRq>) {
    super(data);
  }
}
