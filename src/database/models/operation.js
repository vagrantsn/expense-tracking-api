const mongoose = require('mongoose')

const operationSchema = new mongoose.Schema({
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
    type: mongoose.ObjectId,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

const Operation = mongoose.model('Operation', operationSchema)

module.exports = Operation
