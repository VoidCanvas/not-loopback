import { model, property } from '../../core';

@model()
export class SuccessRs {
  @property() success: boolean;
}
