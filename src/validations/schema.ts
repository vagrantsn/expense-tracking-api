const schemaValidator = ({ schema, payload }) => schema.validate(payload, {
  abortEarly: false,
  strict: true,
})

export default schemaValidator
