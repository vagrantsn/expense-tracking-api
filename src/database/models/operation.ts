import mongoose, { Schema } from 'mongoose'

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
  },
  user_id: {
    type: Schema.Types.ObjectId,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

const Operation = mongoose.model('Operation', operationSchema)

export default Operation
