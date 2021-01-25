import { AnySchema } from 'yup'

const schemaValidator = (
  { schema, payload } :
  { schema: AnySchema, payload: object },
) => schema.validate(payload, {
  abortEarly: false,
  strict: true,
})

export default schemaValidator
