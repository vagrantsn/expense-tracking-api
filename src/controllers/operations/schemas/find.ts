import {
  array,
  object,
  string,
} from 'yup'

const find = object({
  query: object({
    amount: string().matches(/\d+/),
    label: string().trim(),
    tags: array().of(string().trim()),
  }).required(),
})

export default find
