const schemaValidator = ({ schema, payload }) => schema.validate(payload, {
  abortEarly: false,
  strict: true,
})

module.exports = schemaValidator
