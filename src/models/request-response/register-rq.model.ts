// import { model, property } from '@loopback/repository';
import { Base } from '../';

export class RegisterRq extends Base {
  username: string;
  password: string;
  email?: string;
  name?: string;
  constructor(data?: Partial<RegisterRq>) {
    super(data);
  }
}
