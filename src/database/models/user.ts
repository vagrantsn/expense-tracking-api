import { Document, model, Schema } from 'mongoose'
import { omit } from 'ramda'

import User from '../../types/user'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toObject: {
    transform: (doc, ret) : User => ({
      ...omit(['_id', '__v'], ret) as User,
      id: doc.id,
    }),
  },
})

const User = model<Document & User>('User', userSchema)

export default User
