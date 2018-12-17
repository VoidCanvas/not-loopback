import { Entity, model, property } from '@loopback/repository';

@model()
export class AccessToken extends Entity {
  @property({ id: true }) id: string;
  @property() token: string;
  @property() userId: string;
  @property() ttl: number;
  @property() type: string;

  constructor(data?: Partial<AccessToken>) {
    super(data);
  }
}
