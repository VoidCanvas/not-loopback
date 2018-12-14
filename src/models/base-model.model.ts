import { Model } from '@loopback/repository';

export class BaseModel extends Model {
  constructor(data?: Partial<BaseModel>) {
    super(data);
  }
}
