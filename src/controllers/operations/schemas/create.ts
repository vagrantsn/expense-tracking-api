import {
  array,
  object,
  string,
  number,
} from 'yup'

const create = object({
  body: object({
    amount: number().integer().required(),
    label: string().trim().required(),
    tags: array().of(string().trim()),
  }).required(),
})

export default create
