import { Document, model, Schema } from 'mongoose'
import { omit } from 'ramda'

import OperationType from '../../types/operation'

const operationSchema = new Schema<OperationType>({
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
    transform: (doc, ret) : OperationType => ({
      ...omit(['_id', '__v'], ret) as Operation,
      id: doc.id,
      user_id: ret.user_id.toString(),
    }),
    // transform: (doc, ret) : OperationType => {
    //   let cleanOperation = omit(['_id', '__v'], ret) as Operation

    //   return {
    //     ...cleanOperation,
    //     id: doc.id,
    //     user_id: ret.user_id.toString()
    //   }
    // },
  },
})

interface Operation extends OperationType, Document {}

const Operation = model<Operation>('Operation', operationSchema)

export default Operation
