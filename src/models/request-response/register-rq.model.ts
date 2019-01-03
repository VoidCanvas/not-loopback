import { model, property } from '../../core';

@model()
export class RegisterRq {
  @property() username: string;
  @property() password: string;
}
