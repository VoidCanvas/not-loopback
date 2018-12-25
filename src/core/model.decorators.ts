// typeorm helpers
import {
  Entity as t_Entity,
  Column as t_Column,
  EntityOptions,
  ColumnOptions,
  ColumnType,
} from 'typeorm';

// loopback helpers
import {
  model as r_model,
  property as r_property
} from '@loopback/repository';
import { ColumnEmbeddedOptions } from 'typeorm/decorator/options/ColumnEmbeddedOptions';
import defaultDataSource from '../datasources/default';


// extended options
interface CustomEntityOptions extends EntityOptions {
  datasourceConfig?: Object;
}

// maps to hold model config
const MODEL_MAP = new Map();
export function getModelMap() {
  return MODEL_MAP;
}

// Entity - to take care of Entity of typeorm and model of loopback/repository
export function Entity(options?: CustomEntityOptions): Function;
export function Entity(name?: string, options?: CustomEntityOptions): Function;
export function Entity(nameOrOptions?: string | CustomEntityOptions, maybeOptions?: CustomEntityOptions): Function {
  const options = (typeof nameOrOptions === "object" ? nameOrOptions : maybeOptions) || {};
  const name = typeof nameOrOptions === "string" ? nameOrOptions : options.name;

  const t_Entity_fn = t_Entity(name, options);
  const r_model_fn = r_model();

  return (target: Function) => {
    r_model_fn(target);
    MODEL_MAP.set(target, {
      datasourceConfig: options.datasourceConfig || defaultDataSource
    });
    return t_Entity_fn(target);
  }
}

// Column - to take care of Column of typeorm and property of loopback/repository
export function Column(options?: ColumnOptions): Function;
export function Column(type?: ColumnType, options?: ColumnOptions): Function;
export function Column(
  typeOrOptions?: ((type?: any) => Function) | ColumnType | (ColumnOptions & ColumnEmbeddedOptions), // tslint:disable-line
  maybeOptions?: (ColumnOptions & ColumnEmbeddedOptions)
): Function {
  // normalize parameters
  let type: ColumnType | undefined;
  let options = maybeOptions;
  if (typeof typeOrOptions === "string" || typeOrOptions instanceof Function) {
    type = <ColumnType>typeOrOptions;

  } else if (typeOrOptions) {
    options = <ColumnOptions>typeOrOptions;
    type = typeOrOptions.type;
  }
  if (!options) options = {} as ColumnOptions;
  options.type = type;

  // making use of the decorators of typeorm and loopback
  const t_Column_fn = t_Column(options)
  const r_property_fn = r_property({
    required: !options.nullable
  });

  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<{}>) => {
    r_property_fn(target, propertyKey);
    return t_Column_fn(target, propertyKey, descriptor);
  }
}

// some default exports
export const model = r_model;
export const property = r_property;
