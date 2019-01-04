import * as _ from 'lodash';

// Keeping a copy of capabilities (from database)
// cause string based programming is not a great idea
export enum Capability {
  GET_OWN_INFO = "GET_OWN_INFO",
  ROLE_CAPABILITY_CRUD = "ROLE_CAPABILITY_CRUD",
  ROLE_ASSIGNMENT = "ROLE_ASSIGNMENT",
}
