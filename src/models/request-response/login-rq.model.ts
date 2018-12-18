// import { model, property } from '@loopback/repository';
import { Base } from '../';

export class LoginRq extends Base {
  username: string;
  password: string;
  constructor(data?: Partial<LoginRq>) {
    super(data);
  }
}
