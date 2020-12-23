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
  userId: {
    type: mongoose.ObjectId,
  },
}, {
  timestamps: true,
})

const Operation = mongoose.model('Operation', operationSchema)

module.exports = Operation
