import { model, property } from '@loopback/repository';
import { Base } from './base-entity.model';
import * as uuidv4 from 'uuid/v4';

@model({
  name: 'users'
})
export class User extends Base {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<User>) {
    super(data);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
