const {
  array,
  object,
  string,
  number,
} = require('yup')

const create = object({
  body: object({
    amount: number().integer().required(),
    label: string().trim().required(),
    tags: array().of(string().trim()),
  }).required(),
})

module.exports = create
