import { model, property } from '../../not-loopback/model.decorators';
import { Base } from '../';

@model()
export class LoginRq extends Base {
  @property() username: string;
  @property() password: string;
  constructor(data?: Partial<LoginRq>) {
    super(data);
  }
}
