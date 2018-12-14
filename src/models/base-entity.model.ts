import { Entity } from '@loopback/repository';

export class Base extends Entity {
  constructor(data?: Partial<Base>) {
    super(data);
  }

  // property to return the validated state
  get isValid(): boolean {
    return this.validate();
  }

  // validation function to validate models.
  // Every model should extend it accordingly
  validate(): boolean {
    return true;
  }
}
