import { Document, model, Schema } from 'mongoose'
import { omit } from 'ramda'

import UserType from '../../types/User'

const userSchema = new Schema<User>({
  email: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: String,
}, {
  toObject: {
    transform: (doc, ret) : UserType => ({
      id: doc.id,
      ...omit(['_id', '__v'], ret),
    }),
  },
})

interface User extends UserType, Document {}

const User = model<User>('User', userSchema)

export default User
