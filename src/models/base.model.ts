import { getConnectionManager, Column, getRepository, FindOneOptions } from 'typeorm';
import { getModelMap } from '../core';

function getConnectionName(classFn: Function) {
  const entityConfig = getModelMap().get(classFn);
  return (entityConfig && entityConfig.datasourceConfig.name) || 'default';
}
function getManager(classFn: Function) {
  return getConnectionManager().get(getConnectionName(classFn)).manager;
}

// This is a fix for a typeorm bug
function restoreProto<T>(data: FindOneOptions<T> | undefined) {
  if (!data) {
    return;
  }
  let finalData = data;
  if ((typeof data === 'object') && !(data as any).__proto__) { // tslint:disable-line
    finalData = { ...data };
  }
  if (data && data.where && (typeof data.where === 'object') && !(data.where as any).__proto__) { // tslint:disable-line
    finalData.where = { ...data.where };
  }
  return finalData;
}

export declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export declare type DataObject<T extends object> = T | DeepPartial<T>;

export class Base {
  constructor(data?: Partial<Base>) {
    Object.assign(this, data);
  }
}

export class BaseEntity<T> extends Base {
  constructor(data?: Partial<BaseEntity<T>>) {
    super(data);
  }
  @Column('timestamp without time zone', {
    nullable: false,
    default: 'now()',
    name: 'updated_at'
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    nullable: false,
    default: 'now()',
    name: 'created_at'
  })
  updatedAt: Date;

  async save(): Promise<T> {
    const manager = getManager(this.constructor);
    const result = await manager.save((this as any)); // tslint:disable-line
    return (result as T);
  }

  static async findById<T>(id: string): Promise<T | undefined> {
    const result = await getRepository<T>(this, getConnectionName(this))
      .createQueryBuilder('base')
      .where(`base.id = :id`, { id })
      .getOne();
    return result;
  }

  // to fetch one record
  static async findOne<T>(obj?: FindOneOptions<T>): Promise<T | undefined> {
    const result = await getRepository<T>(this, getConnectionName(this)).findOne(restoreProto(obj));
    return result;
  }

  // to fetch one record
  static async findOneOrFail<T>(obj?: FindOneOptions<T>): Promise<T | undefined> {
    const result = await getRepository<T>(this, getConnectionName(this)).findOneOrFail(restoreProto(obj));
    return result;
  }

  // to fetch records
  static async find<T>(obj?: FindOneOptions<T>): Promise<T[]> {
    // obj is eating __proto__
    const result = await getRepository<T>(this, getConnectionName(this)).find(restoreProto<T>(obj));
    return result;
  }
}
