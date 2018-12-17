import { BaseModel } from '..';
import { model, property } from '@loopback/repository';

@model()
export class RegisterRq extends BaseModel {
  @property() username: string;
  @property() password: string;
  @property() email?: string;
  @property() name?: string;
  constructor(data?: Partial<RegisterRq>) {
    super(data);
  }
}
