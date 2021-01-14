import { object, string } from 'yup'

const schema = object().shape({
  body: object().shape({
    email: string().required(),
    password: string().required(),
  }).required(),
})

export default schema
