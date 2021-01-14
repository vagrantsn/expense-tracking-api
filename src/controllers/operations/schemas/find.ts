import {
  array,
  object,
  string,
  number,
} from 'yup'

const find = object({
  query: object({
    amount: number().integer(),
    label: string().trim(),
    tags: array().of(string().trim()),
  }).required(),
})

export default find
