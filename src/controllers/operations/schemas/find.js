const {
  array,
  object,
  string,
  number,
} = require('yup')

const find = object({
  query: object({
    amount: number().integer(),
    label: string().trim(),
    tags: array().of(string().trim()),
  }).required(),
})

module.exports = find
