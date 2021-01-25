import { Types } from 'mongoose'

import UserType from '../user'

export interface create {
  (payload : { email: string, password: string }): Promise<UserType>|UserType
}

export interface findByEmail {
  (email: string): Promise<UserType|null>|UserType|null
}

export interface findById {
  (id: string|Types.ObjectId): Promise<UserType|null>|UserType|null
}

export default interface Users {
  create: create,
  findByEmail: findByEmail,
  findById: findById,
}
