import { Document, model, Schema } from 'mongoose'
import { omit } from 'ramda'

import Operation from '../../types/operation'

const operationSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toObject: {
    transform: (doc, ret) : Operation => ({
      ...omit(['_id', '__v'], ret) as Operation,
      id: doc.id,
      user_id: ret.user_id.toString(),
    }),
  },
})

const Operation = model<Document & Operation>('Operation', operationSchema)

export default Operation
