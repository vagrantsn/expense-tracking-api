import { Types } from 'mongoose'

import OperationType from '../operation'

export interface create {
  (
    { amount, label, tags, user_id } :
    { amount: number, label: string, tags?: string[], user_id: string|Types.ObjectId }
  ): Promise<OperationType>
}

export interface Query {
  id?: string|Types.ObjectId,
  amount?: number,
  label?: string,
  tags?: string[],
  user_id: string|Types.ObjectId
}

export interface SortQuery { createdAt?: 'ascending'|'descending' }

export interface findAll {
  (
    { amount, label, tags, user_id } : Query,
    { createdAt } : SortQuery
  ) : Promise<OperationType[]>
}

export default interface Operations {
  create: create,
  findAll: findAll,
}
