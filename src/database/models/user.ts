import { Document, model, Schema } from 'mongoose'
import { omit } from 'ramda'

import UserType from '../../types/user'

const userSchema = new Schema<User>({
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
    transform: (doc, ret) : UserType => ({
      ...omit(['_id', '__v'], ret) as User,
      id: doc.id,
    }),
  },
})

interface User extends UserType, Document {}

const User = model<User>('User', userSchema)

export default User
