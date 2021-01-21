import { Document, model, Schema } from 'mongoose'
import { omit, mergeRight } from 'ramda'

import OperationType from '../../types/Operation'

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
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toObject: {
    transform: (doc, ret) : OperationType => {
      let cleanOperation = omit(['_id', '__v'], ret)

      return mergeRight(cleanOperation, {
        id: doc.id,
        user_id: ret.user_id.toString(),
      })
    },
  },
})

interface Operation extends OperationType, Document {}

const Operation = model<Operation>('Operation', operationSchema)

export default Operation
